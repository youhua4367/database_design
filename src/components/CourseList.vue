<script setup lang="ts">
import avatar from '@/assets/image/login.png';

const props = defineProps({
    coursesByCategory: {
        type: Object,
        required: true,
        default: () => ({})
    },
    imgUrl: {
        type: String,
        default: avatar
    }
});

const { coursesByCategory, imgUrl } = props;

const emit = defineEmits<{
    "course-click": [courseId: number]
}>()
const handleCourseClick = (courseId: number) => {
    emit("course-click", courseId);
};
</script>

<template>
    <el-container class="content">
        <div class="course" v-for="(courseList, categoryName) in coursesByCategory">
            <div class="course-header">
                <el-header>{{ categoryName }}</el-header>
            </div>
            <div class="course-card">
                <el-card
                    class="course-item"
                    v-for="course in courseList"
                    :key="course.courseId"
                    @click="handleCourseClick(course.courseId)"
                    style="cursor: pointer;"
                >
                    <img :src="imgUrl" alt="" width="200px" height="200px">
                    <div>{{ course.courseName }}</div>
                    <div>{{ course.description }}</div>
                </el-card>
            </div>
        </div>
    </el-container>
</template>

<style scoped lang="scss">
.content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .course {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .course-header {
            width: 100%;
            font-size: 2.6vw;
            display: flex;
            justify-content: flex-start;
        }
        .course-card {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            .course-item {
                width: 23%;
                margin-right: 2%;
                margin-top: 1%;
                transition: all 0.3s ease;
            }
            .course-item:hover {
                transform: translateY(-5px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
        }
    }
}
</style>