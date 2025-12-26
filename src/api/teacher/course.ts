import request from "@/utils/request.ts"
import type { ApiResponse } from "@/types/api"
import type {CoursePost} from "@/types/teacher/course.ts";

/**
 * 获取课程信息
 */
export const courseGetService = (): Promise<ApiResponse> => {
    return request.get("/TeacherCourseController/my-courses");
}

/**
 * 获取课程的学生列表
 * @param courseId 课程 id
 */
export const courseGetStudentService = (courseId: number): Promise<ApiResponse> => {
    return request.get("/TeacherCourseController/" + courseId + "/students");
}

/**
 * 创建课程
 * @param course 课程对象
 */
export const courseCreateService = (course: CoursePost): Promise<ApiResponse> => {
    return request.post("/TeacherCourseController/create", null, {params: course});
}

/**
 * 更新课程
 * @param courseId
 * @param course 课程实体
 */
export const courseUpdateService = (courseId: number, course: CoursePost): Promise<ApiResponse> => {
    return request.put(`/TeacherCourseController/${courseId}`, null, {
        params: {
            courseName: course.courseName,
            description: course.description,
            categoryName: course.categoryName
        }
    });
}


