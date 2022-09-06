import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active-router',
    routes: [
        {
            path: '/',
            name: 'FbLogin',
            component: () => import('../components/auth/FbLogin.vue')
        },
        {
            path: '/register',
            name: 'FbRegister',
            component: () => import('../components/auth/FbRegister.vue')
        },    
        {
            path: '/dashboard',
            name: 'UserDashboard',
            component: () => import('../components/user/UserDashboard.vue')
        }   
    ]
})

export default router