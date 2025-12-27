import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Exam } from "@/types/teacher/exam.ts";
import type { ApiResponse } from "@/types/api";

import {examGetService, examCreateService, examUpdateService, examDeleteService} from "@/api/teacher/exam.ts";

export const useExamStore = defineStore("exam", () => {
    
    // 状态
    const exams = ref<Exam[]>([]);
    const selectedExamId = ref<number | null>(null);
    
    // 当前选中的考试
    const selectedExam = computed(() => {
        return exams.value.find(e => e.examId === selectedExamId.value);
    });
    
    /**
     * 获取指定课程的考试列表
     */
    const getExams = async (courseId: number) => {
        try {
            const res: ApiResponse = await examGetService(courseId);
            if (res.code === 200) {
                exams.value = res.data;
            }
        } catch (error) {
            console.error("获取考试失败", error);
        }
    };
    
    /**
     * 创建考试
     */
    const createExam = async (exam: Exam) => {
        try {
            const res: ApiResponse = await examCreateService(exam);
            if (res.code === 200) {
                await getExams(exam.courseId!);
            }
        } catch (error) {
            console.error("新增考试失败", error);
        }
    };
    
    /**
     * 更新考试
     */
    const updateExam = async (exam: Exam, courseId: number) => {
        try {
            const res: ApiResponse = await examUpdateService(exam);
            if (res.code === 200) {
                await getExams(courseId);
            }
        } catch (error) {
            console.error("更新考试失败", error);
        }
    };
    
    /**
     * 删除考试
     */
    const deleteExam = async (examId: number, courseId: number) => {
        try {
            const res: ApiResponse = await examDeleteService(examId);
            if (res.code === 200) {
                await getExams(courseId);
            }
            return res;
        } catch (error) {
            console.error("删除考试失败", error);
        }
    };
    
    /**
     * 选中某个考试（用于编辑）
     */
    const selectExam = (examId: number) => {
        selectedExamId.value = examId;
    };
    
    return {
        exams,
        selectedExamId,
        selectedExam,
        getExams,
        createExam,
        updateExam,
        deleteExam,
        selectExam
    };
});
