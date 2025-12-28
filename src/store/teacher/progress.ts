import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type { LearningProgress } from "@/types/teacher/progress.ts"
import type { ApiResponse } from "@/types/api"
import { progressGetService } from "@/api/teacher/progress.ts"

export const useLearningProgressStore = defineStore("learningProgress", () => {
        // 进度列表
        const progressList = ref<LearningProgress[]>([])
        const selectedStudentId = ref<number | null>(null)
        
        // 当前选中的学生学习进度
        const selectedProgress = computed(() => {
            return progressList.value.find(
                p => p.studentId === selectedStudentId.value
            )
        })
        
        /**
         * 获取指定课程的学习进度列表
         */
        const getProgressByCourse = async (courseId: number) => {
            try {
                const res: ApiResponse = await progressGetService(courseId)
                if (res.code === 200) {
                    progressList.value = res.data
                }
            } catch (error) {
                console.error("获取学习进度失败", error)
            }
        }
        
        /**
         * 选中某个学生（用于详情查看）
         */
        const selectStudent = (studentId: number) => {
            selectedStudentId.value = studentId
        }
        
        return {
            progressList,
            selectedStudentId,
            selectedProgress,
            getProgressByCourse,
            selectStudent
        }
    }
)
