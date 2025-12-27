import { createRouter, createWebHistory} from "vue-router";
import type {RouteRecordRaw} from "vue-router";


const routes: RouteRecordRaw[] = [
    {path:"/", redirect: '/home'},
    {path:"/login", component: () => import("@/views/Login.vue")},
    {path:"/home", component: () => import("@/views/LayOut.vue"), children: [
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