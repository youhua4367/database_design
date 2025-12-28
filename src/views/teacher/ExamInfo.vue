<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted } from "vue";
import { useCourseStore } from "@/store/teacher/course.ts";
import { useExamStore } from "@/store/teacher/exam.ts";
import {useAssignmentStore} from "@/store/teacher/assignment.ts";

const route = useRoute();
const router = useRouter();
const courseId = computed<number>(() => Number(route.params.id));

const courseStore = useCourseStore();
const examStore = useExamStore();
const assignmentStore = useAssignmentStore();

// 获取课程信息
const getCourse = (id: number) => {
    courseStore.getSelectedCourse(id);
}

// 获取课程下所有考试
const getExams = async () => {
    await examStore.getExams(courseId.value);
}

// 获取所有作业
const getAssignments = async () => {
    await assignmentStore.getAssignments(courseId.value);
}

// 选中某一考试并跳转到批改页面
const goToExamCorrection = (examId: number) => {
    router.push(`/home/exam/${courseId.value}/correct2/${examId}`);
}

// 跳转到作业批改页面
const goToAssignmentPage = (assignmentId: number) => {
    router.push(`/home/exam/${courseId.value}/correct1/${assignmentId}`);
}


onMounted(async () => {
    await courseStore.getCourses();
    getCourse(courseId.value);
    await getExams();
    await getAssignments();
})
</script>

<template>
    <el-container class="wrapper">
        <el-aside class="aside">
            <el-header class="header"> {{ courseStore.selectedCourse?.courseName }} </el-header>
            <el-menu router>
                <el-menu-item :index="`/home/exam/${courseId}/assignment`">作业布置</el-menu-item>
                <el-menu-item :index="`/home/exam/${courseId}/exam`">考试布置</el-menu-item>

                <el-sub-menu index="gradeMenu">
                    <template #title>作业批改</template>
                    <el-menu-item
                        v-for="assignment in assignmentStore.assignments"
                        :key="assignment.assignmentId"
                        @click="goToAssignmentPage(assignment.assignmentId)"
                    >
                        {{ assignment.title }}
                    </el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="correct2Menu">
                    <template #title>考试批改</template>
                    <el-menu-item v-for="exam in examStore.exams" :key="exam.examId" @click="goToExamCorrection(exam.examId)">
                        {{ exam.title }}
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <el-container class="content">
            <router-view></router-view>
        </el-container>
    </el-container>
</template>

<style scoped lang="scss">
.wrapper {
    width: 100%;
    height: 100%;
    .aside {
        height: 100%;
        width:20%;
        border-right:1px solid black;
        display: flex;
        flex-direction: column;
        .header {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #79BBFF;
        }
    }
    .content {
        height: 100%;
        width: 100%;
    }
}
</style>