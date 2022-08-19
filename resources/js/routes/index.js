import { createRouter, createWebHistory } from "vue-router";

import AuthenticatedLayout from "../layouts/Authenticated";
import GuestLayout from "../layouts/Guest";

import BlogsIndex from '../components/Blogs/Index'
import BlogsCreate from '../components/Blogs/Create'
import BlogsEdit from '../components/Blogs/Edit'
import Login from '../components/Login'
import Landing from '../components/Landing'
import SignUp from '../components/SignUp'


function auth(to, from, next) {
    if (JSON.parse(localStorage.getItem('loggedIn'))) {
        next()
    }

    next('/login')
}

const routes = [
    {
        path: '',
        redirect: { name: 'landing' },
        component: GuestLayout,
        children: [
            {
                path: '',
                name: 'landing',
                component: Landing
            },
        ]
    },
    {
        path: '/login',
        redirect: { name: 'login' },
        component: GuestLayout,
        children: [
            {
                path: '/login',
                name: 'login',
                component: Login
            },
        ]
    },
    {
        path: '/signup',
        redirect: { name: 'signup' },
        component: GuestLayout,
        children: [
            {
                path: '/signup',
                name: 'signup',
                component: SignUp
            },
        ]
    },
    {
        component: AuthenticatedLayout,
        beforeEnter: auth,
        children: [
            {
                path: '/blogs',
                name: 'blogs.index',
                component: BlogsIndex,
                meta: { title: 'Blogs' }
            },
            {
                path: '/blogs/create',
                name: 'blogs.create',
                component: BlogsCreate,
                meta: { title: 'Add New Blog' }
            },
            {
                path: '/blogs/edit/:id',
                name: 'blogs.edit',
                component: BlogsEdit,
                meta: { title: 'Edit Blog' }
            },
        ]
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
