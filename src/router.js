import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "./views/Home";
import Login from "./views/Login";
import store from "./store";
import Recommendations from "./views/Recommendations";
import Movies from "./views/Movies";

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/recommend',
        name: 'recommend',
        component: Recommendations,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/movies',
        name: 'movies',
        component: Movies,
        meta: {
            requiresAuth: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})


router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router