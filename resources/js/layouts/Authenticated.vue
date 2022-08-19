<template>
    <nav class="navbar navbar-dark navbar-expand-sm bg-dark fixed-top">
        <div class="container">
            <router-link to="/" class="navbar-brand">
                WSF BLOG
            </router-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div id="navbarCollapse" class="pull-right">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link :to="{ name: 'blogs.index' }"  class="nav-link active">
                            Posts
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'blogs.create' }" class="nav-link active">
                            Create Post
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <button @click="logout" type="button" class="btn btn-secondary ml-5">
                            Log out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <router-view></router-view>
</template>

<script>
import useAuth from "../composables/auth";

export default {
    setup() {
        const { user, processing, logout } = useAuth()

        return { user, processing, logout }
    },
    computed: {
        currentPageTitle() {
            return this.$route.meta.title;
        }
    }
}
</script>
