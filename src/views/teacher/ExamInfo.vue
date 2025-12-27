<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, onMounted} from "vue";
import avatar from "@/assets/image/login.png";
import {useCourseStore} from "@/store/teacher/useCourseStore.ts";

const image = avatar
const route = useRoute();
const courseId = computed<number>(() => {
    return Number(route.params.id);
})
const courseStore = useCourseStore();
// 获取课程信息
const getCourse = (id: number) => {
    courseStore.getSelectedCourse(id);
}

onMounted(async () => {
    await courseStore.getCourses();
    getCourse(courseId.value);
})

</script>

<template>
    <el-container class="wrapper">
        <el-aside class="aside">
            <el-header class="header"> {{ courseStore.selectedCourse?.courseName }} </el-header>
            <el-menu router>
                <el-menu-item :index="`/home/exam/${courseId}/assignment`">作业布置</el-menu-item>
                <el-menu-item :index="`/home/exam/${courseId}/exam`">考试布置</el-menu-item>
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