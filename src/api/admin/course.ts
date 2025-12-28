import request from "@/utils/request.ts";
import type { ApiResponse } from "@/types/api";

/**
 * 查询待审核课程列表
 */
export const getPendingCoursesService = (): Promise<ApiResponse> => {
    return request.get("/AdminCourseController/pending");
};

/**
 * 审核课程
 * @param courseId 课程ID
 * @param status 审核状态 0-未审核，1-审核中，2-已通过
 */
export const approveCourseService = (courseId: number, status: number): Promise<ApiResponse> => {
    return request.put(`/AdminCourseController/${courseId}/approve`, null, {
        params: {
            status: status,
        }
    });
};

/**
 * 删除课程
 * @param courseId 课程ID
 */
export const deleteCourseService = (courseId: number): Promise<ApiResponse> => {
    return request.delete(`/AdminCourseController/${courseId}`);
};
