import { createRouter, createWebHistory} from "vue-router";
import type {RouteRecordRaw} from "vue-router";
import {useTokenStore} from "@/store/token.ts";


const routes: RouteRecordRaw[] = [
    {path:"/", redirect: '/login'},
    {path:"/login", component: () => import("@/views/Login.vue")},
    // 教师端
    {path:"/teacher/home",
        component: () => import("@/views/teacher/LayOut.vue"),
        redirect: "/teacher/home/course",
        meta:{role: 2},
        children: [
            // 课程
            {path:"course", component: () => import("@/views/teacher/Course.vue")},
            // 章节
            {path:"chapter", component: () => import("@/views/teacher/Chapter.vue")},
            {path:"chapter/:id", component: () => import("@/views/teacher/ChapterInfo.vue")},
            // 考试和作业
            {path:"exam", component: () => import("@/views/teacher/ExamLayout.vue")},
            {path:"exam/:id", component: () => import("@/views/teacher/ExamInfo.vue"), children: [
                    {path:"exam", component: () => import("@/views/teacher/Exam.vue")},
                    {path:"assignment", component: () => import("@/views/teacher/Assignment.vue")},
                    // 作业批改
                    {path:"correct1/:assignmentId", component: () => import("@/views/teacher/AssignmentCorrect.vue")},
                    // 考试批改
                    {path:"correct2/:examId", component: () => import("@/views/teacher/ExamCorrect.vue")},
                ]},
            // 学生管理
            {path:"person", component: () => import("@/views/teacher/StudentLayout.vue")},
            {path:"person/:id", component: () => import("@/views/teacher/Student.vue")},
            // 评论区
            {path:"comment", component: () => import("@/views/teacher/CommentLayout.vue")},
            {path:"comment/:id", component: () => import("@/views/teacher/Comment.vue")},
        ]},
    
    {path:"/admin/home",
        component: () => import("@/views/admin/LayOut.vue"),
        redirect:"/admin/home/category",
        meta:{role: 3},
        children: [
            {path:"category", component: () => import("@/views/admin/Category.vue")},
        ]},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

// 守卫路由
router.beforeEach((to) => {
    const tokenStore = useTokenStore();
    
    if (!tokenStore.token && to.path !== "/login") return "/login";
    
    if (to.path === "/login" && tokenStore.token) {
        switch (tokenStore.role) {
            case 1: return "/student/home";
            case 2: return "/teacher/home";
            case 3: return "/admin/home";
        }
    }
    
    if (to.meta.role) {
        const allowedRoles: number[] = Array.isArray(to.meta.role) ? to.meta.role : [to.meta.role];
        if (!allowedRoles.includes(tokenStore.role)) return "/403";
    }
});



export default router;