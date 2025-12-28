<script setup lang="ts">
import { useRoute } from "vue-router"
import { computed, onMounted, ref } from "vue"
import { useCourseStore } from "@/store/teacher/course.ts"
import {useLearningProgressStore} from "@/store/teacher/progress.ts";
import avatar from "@/assets/image/login.png"

const image = avatar
const route = useRoute()
const courseId = computed(() => Number(route.params.id))

const courseStore = useCourseStore()
const progressStore = useLearningProgressStore()

// dialog 控制
const progressDialogVisible = ref(false)
const currentStudentId = ref<number | null>(null)

// 当前学生的章节进度
const currentStudentProgress = computed(() => {
    if (!currentStudentId.value) return []
    return progressStore.progressList.filter(
        p => p.studentId === currentStudentId.value
    )
})

/**
 * 查看学生学习进度
 * @param studentId
 */
const viewStudentProgress = async (studentId: number) => {
    currentStudentId.value = studentId
    await progressStore.getProgressByCourse(courseId.value)

    progressDialogVisible.value = true
}

onMounted(async () => {
    await courseStore.getCourses()
    courseStore.getSelectedCourse(courseId.value)
    // 获取选课学生
    await courseStore.getStudents(courseId.value)
})
</script>

<template>
    <el-container class="wrapper">
        <!-- 课程信息 -->
        <el-header class="header">
            <el-card class="header-card">
                <img :src="image" alt="" style="width:200px; height:200px;">
                <div>课程名称：{{ courseStore.selectedCourse?.courseName }}</div>
                <div>课程描述：{{ courseStore.selectedCourse?.description }}</div>
            </el-card>
        </el-header>
        <el-main class="main">
            <el-card class="main-card">
                <div class="title">选课学生</div>
                <el-table :data="courseStore.courseStudent" class="table">
                    <el-table-column prop="studentId" label="学生ID"/>
                    <el-table-column label="操作">
                        <template #default="{ row }">
                            <el-button type="primary" size="small" @click="viewStudentProgress(row.studentId)">
                                查看学习进度
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-main>

        <el-dialog v-model="progressDialogVisible" title="学生学习进度" width="40vw">
            <el-table :data="currentStudentProgress" style="width: 100%">
                <el-table-column prop="chapterId" label="章节ID"/>
                <el-table-column prop="progress" label="学习进度">
                    <template #default="{ row }">
                        <el-progress :percentage="row.progress"/>
                    </template>
                </el-table-column>
                <el-table-column prop="onlineTime" label="在线时长(分钟)"/>

                <el-table-column prop="loginTimes" label="登录次数"/>
            </el-table>
        </el-dialog>
    </el-container>
</template>


<style scoped lang="scss">
.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
        display: flex;
        width: 100%;
        height: 40%;
        align-items: flex-start;
        justify-content: center;
        .header-card {
            width: 100%;
            height: 100%;
            div:nth-child(2) {
                font-weight: bold;
                font-size: 1.5vw;
                margin-top: 1vh;
            }

            div:nth-child(3) {
                font-size: 0.8vw;
                color: #666;
                margin-top: 0.5vh;
            }
        }
    }

    .main {
        .main-card {
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
            overflow: hidden;
            .title {
                font-size: 1.2vw;
                font-weight: bold;
                margin: 1.5vh 1.5vw;
                padding-bottom: 1vh;
                border-bottom: 1px solid #f0f0f0;
            }

            .table {
                --el-table-header-text-color: #4b5563;
                --el-table-row-hover-bg-color: #f9fafb; // hover浅背景
                --el-table-border-color: #e5e7eb; // 柔和边框色
                --el-table-stripe-row-bg-color: #f9fafb; // 斑马纹背景
                font-size: 0.9vw;

                // 表头样式
                :deep(.el-table__header) {
                    .el-table-cell {
                        background-color: #f9fafb;
                        font-weight: 500;
                    }
                }

                // 单元格内边距
                :deep(.el-table-cell) {
                    padding: 12px 16px;
                    text-align: center; // 内容居中
                }

                // 操作按钮样式
                :deep(.el-button) {
                    border-radius: 6px; // 按钮圆角
                    padding: 6px 16px;
                    background-color: #3b82f6; // 主色调
                    border-color: #3b82f6;

                    &:hover {
                        background-color: #2563eb; // hover深色
                        border-color: #2563eb;
                    }
                }
            }
        }
    }
}
</style>