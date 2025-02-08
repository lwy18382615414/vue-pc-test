import { createRouter, createWebHashHistory } from "vue-router";


export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/Home/index.vue'),
            meta: {
                title: '首页',
            }
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/pages/About/index.vue'),
            meta: {
                title: '关于',
            }
        }
    ]
})

export default router