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
                        <router-link to="/login" class="nav-link active">
                            Login
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/signup" class="nav-link active">
                            Sign Up
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <router-view></router-view>
</template>

