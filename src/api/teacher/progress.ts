import request from '@/utils/request'
import type {ApiResponse} from "@/types/api.ts";

/**
 * 获取指定课程的所有学生学习进度
 * @param courseId 课程ID
 */
export const progressGetService = (courseId: number): Promise<ApiResponse> => {
    return request.get(
        `/TeacherLearningProgressController/course/${courseId}`
    )
}
