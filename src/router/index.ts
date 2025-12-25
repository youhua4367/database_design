import { createRouter, createWebHistory} from "vue-router";
import type {RouteRecordRaw} from "vue-router";
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import CourseList from './views/CourseList.vue'
import CourseDetail from './views/CourseDetail.vue'
import MyCourses from './views/MyCourses.vue'
import Study from './views/Study.vue'
import Progress from './views/Progress.vue'
import Discussion from './views/Discussion.vue'
import Student from './views/StudentHome.vue'
import ChapterDetail from "@/views/student/ChapterDetail.vue";
const routes: RouteRecordRaw[] = [
    {path:"/", redirect: '/courses'},
    {path:"/login", component: Login},
    {path:"/register", component: Register},
    { path: '/courses', component: CourseList },
    { path: '/course/:id', component: CourseDetail },
    { path: '/mycourses', component: MyCourses },
    { path: '/study/:id', component: Study },
    { path: '/progress', component: Progress },
    { path: '/discussion/:id', component: Discussion },
    { path: '/student',component: Student },
    { path: '/course/:courseId/chapter/:chapterId', component: ChapterDetail },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;