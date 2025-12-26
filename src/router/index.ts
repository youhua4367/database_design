import { createRouter, createWebHistory} from "vue-router";
import type {RouteRecordRaw} from "vue-router";
import {useTokenStore} from "@/store/token.ts";

const routes: RouteRecordRaw[] = [
    {path:"/", redirect: '/home'},
    {path:"/login", component: () => import("@/views/Login.vue")},
    {path:"/home", component: () => import("@/views/LayOut.vue"), children: [
            {path:"/course", component: () => import("@/views/teacher/Course.vue")},
            {path:"/chapter", component: () => import("@/views/teacher/Chapter.vue")},
            {path:"/chapter/:id", component: () => import("@/views/teacher/ChapterInfo.vue")},
        ]},
    
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

// 守卫路由
router.beforeEach((to) => {
    const tokenStore = useTokenStore()
    console.log("访问路由:", to.path, "token:", tokenStore.token)
    
    if (to.path === '/login' && tokenStore.token) return '/home'
    if (to.path !== '/login' && !tokenStore.token) return '/login'
})



export default router;