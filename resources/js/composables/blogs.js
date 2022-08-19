import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

export default function useBlogs() {
    const blogs = ref({})
    const blog = ref({
        title: '',
        content: '',
    })
    const router = useRouter()
    const validationErrors = ref({})
    const isLoading = ref(false)
    const swal = inject('$swal')

    const getBlogs = async (
        page = 1,
        search_title = '',
        search_content = '',
        order_column = 'created_at',
        order_direction = 'desc'
    ) => {
        axios.get('/api/blogs?page=' + page +
            '&search_title=' + search_title +
            '&search_content=' + search_content +
            '&order_column=' + order_column +
            '&order_direction=' + order_direction, {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token') 
                }
        })
        .then(response => {
            if(response.data.status === 'success'){
                blogs.value = response.data.blogs;
            }
        })
    }

    const getBlog = async (id) => {
        axios.get('/api/blogs/' + id, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token') 
            }
        })
        .then(response => {
            if(response.data.status === 'success'){
                blog.value = response.data.blog;
            }
        })
    }

    const storeBlog = async (blog) => {
        if (isLoading.value) return;
        console.log(blog)
        isLoading.value = true
        validationErrors.value = {}

        axios.post('/api/blogs', blog, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token') 
            }
        })
        .then(response => {
            router.push({name: 'blogs.index'})
            swal({
                icon: 'success',
                title: 'Blog saved successfully'
            })
        })
        .catch(error => {
            if (error.response?.data) {
                validationErrors.value = error.response.data.errors
            }
        })
        .finally(() => isLoading.value = false)
    }

    const updateBlog = async (blog) => {
        if (isLoading.value) return;
        console.log(blog)

        isLoading.value = true
        validationErrors.value = {}

        axios.put('/api/blogs/' + blog.id, blog, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token') 
            }
        })
        .then(response => {
            router.push({name: 'blogs.index'})
            swal({
                icon: 'success',
                title: 'Blog saved successfully'
            })
        })
        .catch(error => {
            if (error.response?.data) {
                validationErrors.value = error.response.data.errors
            }
        })
        .finally(() => isLoading.value = false)
    }

    const deleteBlog = async (id) => {
        swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#ef4444',
            timer: 20000,
            timerProgressBar: true,
            reverseButtons: true
        })
            .then(result => {
                if (result.isConfirmed) {
                    axios.delete('/api/blogs/' + id, {
                        headers: {
                          Authorization: 'Bearer ' + localStorage.getItem('token') 
                        }
                    })
                    .then(response => {
                        getBlogs()
                        router.push({name: 'blogs.index'})
                        swal({
                            icon: 'success',
                            title: 'Blog deleted successfully'
                        })
                    })
                    .catch(error => {
                        swal({
                            icon: 'error',
                            title: 'Something went wrong'
                        })
                    })
                }
            })

    }

    return {
        blogs,
        blog,
        getBlogs,
        getBlog,
        storeBlog,
        updateBlog,
        deleteBlog,
        validationErrors,
        isLoading
    }
}
