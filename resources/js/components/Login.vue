<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="card shadow">
                <div class="card-title text-center border-bottom">
                    <h2 class="p-3">Login</h2>
                </div>
                <div class="card-body">
                    <form @submit.prevent="submitLogin">
                        <div class="mb-4">
                            <label for="username" class="form-label">Email</label>
                            <input required v-model="loginForm.email" type="email" class="form-control" id="email" />
                            <!-- Validation Errors -->
                            <div class="text-red-600 mt-1">
                                <div v-for="message in validationErrors?.email">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label for="password" class="form-label">Password</label>
                            <input required v-model="loginForm.password" type="password" class="form-control" id="password" />
                            <!-- Validation Errors -->
                            <div class="text-red-600 mt-1">
                                <div v-for="message in validationErrors?.password">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn text-light main-bg">Login</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import useAuth from '../composables/auth'

export default {
    setup() {
        const { loginForm, validationErrors, processing, submitLogin } = useAuth()

        return { loginForm, validationErrors, processing, submitLogin }
    }
}
</script>

<style>
:root{
  --main-bg:#e91e63;
}

.main-bg {
  background: var(--main-bg) !important;
}

input:focus, button:focus {
  border: 1px solid var(--main-bg) !important;
  box-shadow: none !important;
}

.form-check-input:checked {
  background-color: var(--main-bg) !important;
  border-color: var(--main-bg) !important;
}

.card, .btn, input{
  border-radius:0 !important;
}
.card{
    margin-top: 200px;
}
</style>
