import request from "@/utils/request.ts"
import type { ApiResponse } from "@/types/api"

/**
 * 将指定帖子置顶
 */
export const postPinService = (postId: number): Promise<ApiResponse> => {
    return request.post(
        `/TeacherPostController/${postId}/pin`
    )
}

/**
 * 取消帖子置顶
 */
export const postUnpinService = (postId: number): Promise<ApiResponse> => {
    return request.post(
        `/TeacherPostController/${postId}/unpin`
    )
}

/**
 * 发布课程公告
 */
export const postAnnouncementService = (
    courseId: number,
    content: string
): Promise<ApiResponse> => {
    return request.post(
        `/TeacherPostController/announcement`,
        null,
        {
            params: {
                courseId: courseId,
                content: content
            }
        }
    )
}

/**
 * 删除帖子
 */
export const postDeleteService = (postId: number): Promise<ApiResponse> => {
    return request.delete(
        `/TeacherPostController/${postId}`
    )
}



/**
 * 在指定课程中发表新帖子
 */
export const studentPostCreateService = (
    courseId: number,
    content: string
): Promise<ApiResponse> => {
    return request.post(
        `/StudentPostController/create`,
        null,
        {
            params: {
                courseId: courseId,
                content: content
            }
        }
    )
}

/**
 * 对指定帖子进行回复
 */
export const studentPostReplyService = (
    postId: number,
    content: string
): Promise<ApiResponse> => {
    return request.post(
        `/StudentPostController/reply`,
        null,
        {
            params: {
                postId: postId,
                content: content
            }
        }
    )
}

/**
 * 根据帖子 ID 获取帖子详情
 */
export const studentPostDetailService = (
    postId: number
): Promise<ApiResponse> => {
    return request.get(
        `/StudentPostController/${postId}`
    )
}

/**
 * 获取指定帖子的所有回复
 */
export const studentPostReplyListService = (
    postId: number
): Promise<ApiResponse> => {
    return request.get(
        `/StudentPostController/${postId}/replies`
    )
}

/**
 * 获取指定课程下的所有帖子
 */
export const studentPostListByCourseService = (
    courseId: number
): Promise<ApiResponse> => {
    return request.get(
        `/StudentPostController/course/${courseId}`
    )
}
