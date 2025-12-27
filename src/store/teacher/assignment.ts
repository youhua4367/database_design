import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type {Assignment, AssignmentForm, AssignmentResult} from "@/types/teacher/assignment.ts"
import type { ApiResponse } from "@/types/api"

import {
    assignmentGetService,
    assignmentCreateService,
    assignmentDeleteService,
    assignmentUpdateService, assignmentResultGetService, assignmentResultCreateService
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

export const useAssignmentResultStore = defineStore("assignmentResult", () => {
    // 所有提交记录
    const submissions = ref<AssignmentResult[]>([]);
    const selectedAssignmentId = ref<number | null>(null);
    const selectedStudentId = ref<number | null>(null);
    
    // 当前选中学生提交
    const selectedStudentSubmission = computed(() => {
        if (selectedAssignmentId.value === null || selectedStudentId.value === null) return null;
        return submissions.value.find(
            s => s.assignmentId === selectedAssignmentId.value && s.studentId === selectedStudentId.value
        );
    });
    
    /**
     * 获取作业提交列表
     */
    const getSubmissionsByAssignment = async (assignmentId: number) => {
        try {
            const res: ApiResponse = await assignmentResultGetService(assignmentId);
            if (res.code === 200) {
                submissions.value = res.data || [];
            }
        } catch (error) {
            console.error("获取作业提交失败", error);
        }
    };
    
    /**
     * 批改作业
     */
    const gradeSubmission = async (form: AssignmentForm) => {
        try {
            const res: ApiResponse = await assignmentResultCreateService(form);
            if (res.code === 200) {
                // 批改后刷新列表
                await getSubmissionsByAssignment(selectedAssignmentId.value!);
            }
            return res;
        } catch (error) {
            console.error("批改作业失败", error);
        }
    };
    
    /**
     * 选中某个学生的提交
     */
    const selectStudent = (studentId: number, assignmentId: number) => {
        selectedStudentId.value = studentId;
        selectedAssignmentId.value = assignmentId;
    };
    
    return {
        submissions,
        selectedAssignmentId,
        selectedStudentId,
        selectedStudentSubmission,
        getSubmissionsByAssignment,
        gradeSubmission,
        selectStudent
    };
});