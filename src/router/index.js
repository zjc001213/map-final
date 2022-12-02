import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Layout from '@/layout/index.vue'

const routes = [
    {
        path: '/',
        redirect: '/home',
        // component: Layout,
        meta: {
            title: 'redirect'
        }
    },
    {
        path: '/demo',
        component: () => import("@/views/MyDemo.vue"),
        meta: {
            title: 'demo'
        }
    },
    {
        path: '/home',
        component: () => import("@/views/homePage/index.vue"),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/gate',
        component: () => import("@/views/gate/index.vue"),
        meta: {
            title: '闸站'
        }

    },
    {
        path: '/rainfall',
        component: () => import("@/views/rainfall/index.vue"),
        meta: {
            title: '雨量站'
        }
    }

]


const router = new VueRouter({
    routes
})

export default router