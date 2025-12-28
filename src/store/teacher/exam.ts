import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type {Exam, ExamForm, ExamResult} from "@/types/teacher/exam.ts";
import type { ApiResponse } from "@/types/api";

import {
    examGetService,
    examCreateService,
    examUpdateService,
    examDeleteService,
    examResultGetService, examResultCreateService
} from "@/api/teacher/exam.ts";

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
    const selectExam = (examId: number)  => {
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

export const useExamResultStore = defineStore("examResult", () => {
    // 所有成绩列表
    const results = ref<ExamResult[]>([]);
    const selectedExamId = ref<number | null>(null);
    const selectStudentId = ref<number | null>(null);
    
    // 当前选中的成绩
    const selectedResult = computed(() => {
        return results.value.find(r => r.examId === selectedExamId.value);
    });
    
    // 选中的学生的 examResult
    const selectedStudentResult = computed(() => {
        if (selectStudentId.value === null || selectedExamId.value === null) return null;
        return results.value.find(r => r.studentId === selectStudentId.value && r.examId === selectedExamId.value);
    });

    /**
     * 获取指定考试的所有学生成绩
     */
    const getResultsByExam = async (examId: number) => {
        try {
            const res: ApiResponse = await examResultGetService(examId);
            if (res.code === 200) {
                results.value = res.data || [];
            }
        } catch (error) {
            console.error("获取考试成绩失败", error);
        }
    };
    
    /**
     * 为指定学生录入考试成绩
     */
    const createResult = async (examForm: ExamForm) => {
        try {
            const res: ApiResponse = await examResultCreateService(examForm);
            if (res.code === 200) {
                // 重新刷新成绩列表
                await getResultsByExam(examForm.examId);
            }
        } catch (error) {
            console.error("录入考试成绩失败", error);
        }
    };
    
    /**
     * 选中某个考试（用于查看成绩或操作）
     */
    const selectExam = (examId: number) => {
        selectedExamId.value = examId;
    };
    
    const selectStudent = (studentId: number, examId: number) => {
        selectedExamId.value = examId;
        selectStudentId.value = studentId;
    }
    
    return {
        results,
        selectedExamId,
        selectedResult,
        selectStudentId,
        selectedStudentResult,
        getResultsByExam,
        createResult,
        selectExam,
        selectStudent,
    };
});