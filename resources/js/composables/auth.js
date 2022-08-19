import { ref, reactive, inject } from 'vue'
import { useRouter } from "vue-router";

const user = reactive({
    name: '',
    email: '',
})

export default function useAuth() {
    const processing = ref(false)
    const validationErrors = ref({})
    const router = useRouter()
    const swal = inject('$swal')

    const loginForm = reactive({
        email: '',
        password: ''
    })

    const signUpForm = reactive({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const submitSignUp = async () => {
        if (processing.value) return

        processing.value = true
        validationErrors.value = {}

        axios.post('/api/signup', signUpForm)
            .then(async response => {
                if(response.data.status === 'success'){
                    loginUser(response)
                }
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => processing.value = false)
    }


    const submitLogin = async () => {
        if (processing.value) return

        processing.value = true
        validationErrors.value = {}

        axios.post('/api/login', loginForm)
            .then(async response => {
                if(response.data.status === 'success'){
                    loginUser(response)
                }
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => processing.value = false)
    }

    const loginUser = async (response) => {
        user.name = response.data.name
        user.email = response.data.email
        localStorage.setItem('loggedIn', JSON.stringify(true))
        localStorage.setItem('token', response.data.token)
        await router.push({ name: 'blogs.index' })
    }

    const getUser = () => {
        axios.get('/api/refresh-token', {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token') 
            }
        })
        .then(response => {
            if(response.data.status === 'success'){
                loginUser(response)
            }
        })
    }

    const logout = async () => {
        if (processing.value) return

        processing.value = true

        axios.post('/api/logout')
            .then(response => router.push({ name: 'login' }))
            .catch(error => {
                swal({
                    icon: 'error',
                    title: error.response.status,
                    text: error.response.statusText
                })
            })
            .finally(() => {
                processing.value = false
            })
    }


    return {
        loginForm,
        signUpForm,
        validationErrors,
        processing,
        submitLogin,
        submitSignUp,
        user,
        getUser,
        logout
    }
}
