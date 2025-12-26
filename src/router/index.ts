import { createRouter, createWebHistory} from "vue-router";
import type {RouteRecordRaw} from "vue-router";

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