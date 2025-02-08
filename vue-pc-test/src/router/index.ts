import { createRouter, createWebHashHistory } from "vue-router";


export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/Home/index.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/pages/About/index.vue'),
        }
    ]
})

export default router