import { createRouter, createWebHistory} from "vue-router";
import type {RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {path:"/", redirect: '/home'},
    {path:"/home", component: import("@/components/Home.vue")},
    {path:"/login", component: import("./components/Login.vue")},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;