import { createRouter, createWebHistory } from 'vue-router'


import CourseEnroll from "@/views/student/CourseEnroll.vue";
import CourseList from '@/views/student/CourseList.vue'
import CourseDetail from '@/views/student/CourseDetail.vue'
import ChapterDetail from '@/views/student/ChapterDetail.vue'
import MyCourse from "@/views/student/MyCourse.vue";
import AssignmentPage from "@/views/student/AssignmentPage.vue";
import ExamPage from "@/views/student/ExamPage.vue";
import ProfilePage from "@/views/student/ProfilePage.vue";
import LayOut from "@/views/LayOut.vue";
import AssignmentSubmit from "@/views/student/AssignmentSubmit.vue";
import PostList from "@/views/student/PostList.vue";
import PostDetail from "@/views/student/PostDetail.vue";
const routes: RouteRecordRaw[] = [
    { path: '', redirect: '/home' },
    {
        path: '/home',
        component: LayOut,
        children: [


            { path: 'courses', component: CourseList },
            { path: 'courses/:courseId', component: CourseDetail },
            { path: 'courses/:courseId/chapter/:chapterId', component: ChapterDetail },
            { path: 'courses/:courseId/enroll', component: CourseEnroll },
            { path: 'mycourses', component: MyCourse },
            { path: 'assignment', component: AssignmentPage },
            { path: 'exam', component: ExamPage },
            { path: 'profile', component: ProfilePage },
            { path: 'assignment/submit/:assignmentId',component: AssignmentSubmit ,name:"AssignmentSubmit"},
            { path: 'postlist', component: PostList },
            { path: 'postdetail/:postId', name: "PostDetail", component: PostDetail }

        ]
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
