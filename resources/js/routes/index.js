import { createRouter, createWebHistory } from "vue-router";

import AuthenticatedLayout from "../layouts/Authenticated";
import GuestLayout from "../layouts/Guest";

import BlogsIndex from '../components/Blogs/Index'
import BlogsCreateEdit from '../components/Blogs/CreateEdit'
import Login from '../components/Login'
import Landing from '../components/Landing'
import SignUp from '../components/SignUp'


function guardCheck(to, from, next) {
    if (JSON.parse(localStorage.getItem('loggedIn'))) {
        next()
        return
    }

    next('/login')
    return
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
            {
                path: '/login',
                name: 'login',
                component: Login
            },
            {
                path: '/signup',
                name: 'signup',
                component: SignUp
            }
        ]
    },
    {
        path: '',
        beforeEnter: guardCheck,
        redirect: { name: 'blogs.index' },
        component: AuthenticatedLayout,
        children: [
            {
                path: '/blogs',
                name: 'blogs.index',
                component: BlogsIndex
            },
            {
                path: '/blogs/create',
                name: 'blogs.create',
                component: BlogsCreateEdit
            },
            {
                path: '/blogs/edit/:id',
                name: 'blogs.edit',
                component: BlogsCreateEdit
            },
        ]
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
