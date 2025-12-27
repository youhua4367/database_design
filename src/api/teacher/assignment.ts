import request from "@/utils/request.ts"
import type { ApiResponse } from "@/types/api"
import type {Assignment} from "@/types/teacher/assignment.ts";

/**
 * 获取作业列表
 * @param courseId
 */
export const assignmentGetService = (courseId: number): Promise<ApiResponse> =>{
    return request.get("/Teacher/AssignmentController/course/" + courseId)
}

/**
 * 新增作业
 * @param assignment 作业信息
 */
export const assignmentCreateService = (assignment: Assignment): Promise<ApiResponse> => {
    return request.post(
        "/Teacher/AssignmentController/create",
        null,
        {
            params: {
                courseId: assignment.courseId,
                title: assignment.title,
                content: assignment.content,
                type: assignment.type,
                deadline: assignment.deadline
            }
        }
    )
}

/**
 * 根据作业ID删除作业
 * @param assignmentId 作业ID
 */
export const assignmentDeleteService = (assignmentId: number): Promise<ApiResponse> => {
    return request.delete("/Teacher/AssignmentController/" + assignmentId)
}

/**
 * 更新作业
 * @param assignment 作业实体
 */
export const assignmentUpdateService = (
    assignment: Assignment
): Promise<ApiResponse> => {
    return request.put(
        `/Teacher/AssignmentController/${assignment.assignmentId}`,
        null,
        {
            params: {
                title: assignment.title,
                content: assignment.content,
                type: assignment.type,
                deadline: assignment.deadline
            }
        }
    )
}