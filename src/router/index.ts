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

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;