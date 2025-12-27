import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type { Assignment } from "@/types/teacher/assignment.ts"
import type { ApiResponse } from "@/types/api"

import {
    assignmentGetService,
    assignmentCreateService,
    assignmentDeleteService,
    assignmentUpdateService
} from "@/api/teacher/assignment.ts"

export const useAssignmentStore = defineStore("assignment", () => {
    
    // 状态
    const assignments = ref<Assignment[]>([])
    const selectedAssignmentId = ref<number | null>(null)
    
    // 当前选中的作业
    const selectedAssignment = computed(() => {
        return assignments.value.find(
            a => a.assignmentId === selectedAssignmentId.value
        )
    })
    
    /**
     * 获取某课程下的作业列表
     */
    const getAssignments = async (courseId: number) => {
        try {
            const res: ApiResponse = await assignmentGetService(courseId)
            if (res.code === 200) {
                assignments.value = res.data
            }
        } catch (error) {
            console.error("获取作业失败", error)
        }
    }
    
    /**
     * 新增作业
     */
    const createAssignment = async (assignment: Assignment) => {
        try {
            const res: ApiResponse = await assignmentCreateService(assignment)
            if (res.code === 200) {
                await getAssignments(assignment.courseId!)
            }
        } catch (error) {
            console.error("新增作业失败", error)
        }
    }
    
    /**
     * 删除作业
     */
    const deleteAssignment = async (assignmentId: number, courseId: number) => {
        try {
            const res: ApiResponse = await assignmentDeleteService(assignmentId)
            if (res.code === 200) {
                await getAssignments(courseId)
            }
            return res
        } catch (error) {
            console.error("删除作业失败", error)
        }
    }
    
    /**
     * 更新作业
     */
    const updateAssignment = async (assignment: Assignment, courseId: number) => {
        try {
            const res: ApiResponse = await assignmentUpdateService(assignment)
            if (res.code === 200) {
                await getAssignments(courseId)
            }
        } catch (error) {
            console.error("更新作业失败", error)
        }
    }
    
    /**
     * 选中某个作业（用于编辑 / 批改）
     */
    const selectAssignment = (assignmentId: number) => {
        selectedAssignmentId.value = assignmentId
    }
    
    return {
        assignments,
        selectedAssignmentId,
        selectedAssignment,
        getAssignments,
        createAssignment,
        deleteAssignment,
        updateAssignment,
        selectAssignment
    }
})
