import request from "@/utils/request.ts";
import type { ApiResponse } from "@/types/api";
import type { Exam } from "@/types/teacher/exam.ts";

/**
 * 获取指定课程的所有考试列表
 * @param courseId 课程ID
 */
export const examGetService = (courseId: number): Promise<ApiResponse> => {
    return request.get(`/TeacherExamController/course/${courseId}`);
}

/**
 * 创建考试
 * @param exam 考试信息
 */
export const examCreateService = (exam: Exam): Promise<ApiResponse> => {
    return request.post(
        "/TeacherExamController/create",
        null,
        {
            params: {
                courseId: exam.courseId,
                title: exam.title,
                questionBank: exam.questionBank,
                totalScore: exam.totalScore,
                passScore: exam.passScore,
                duration: exam.duration,
                startTime: exam.startTime,
                endTime: exam.endTime
            }
        }
    );
}

/**
 * 更新指定考试信息
 * @param exam 考试信息
 */
export const examUpdateService = (exam: Exam): Promise<ApiResponse> => {
    return request.put(
        `/TeacherExamController/${exam.examId}`,
        null,
        {
            params: {
                title: exam.title,
                questionBank: exam.questionBank,
                totalScore: exam.totalScore,
                passScore: exam.passScore,
                duration: exam.duration,
                startTime: exam.startTime,
                endTime: exam.endTime
            }
        }
    );
}

/**
 * 删除考试
 * @param examId 考试ID
 */
export const examDeleteService = (examId: number): Promise<ApiResponse> => {
    return request.delete(`/TeacherExamController/${examId}`);
}
