<script setup lang="ts">
import {onMounted} from "vue";
import {useCourseStore} from "@/store/teacher/useCourseStore.ts";
import CourseList from "@/components/CourseList.vue";
import {useRouter} from "vue-router";


const router = useRouter();
// 课程存储
const courseStore = useCourseStore()

const handleClick = (courseId: number) => {
    router.push(`/home/chapter/${courseId}`);
}

onMounted(() => {
    courseStore.getCourses();
    courseStore.getCategory();
})
</script>

<template>
    <el-container class="wrapper">
        <!--主体内容-->
       <CourseList
            :courses-by-category="courseStore.coursesByCategory"
            @course-click="handleClick"
       />


    </el-container>
</template>

<style scoped lang="scss">
.wrapper {
    height: 100%;
    width: 100%;
}
</style>