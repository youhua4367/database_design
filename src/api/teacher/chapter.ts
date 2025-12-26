import request from "@/utils/request.ts"
import type { ApiResponse } from "@/types/api"
import type {Chapter} from "@/types/teacher/chapter.ts";

/**
 * 获取课程的章节
 * @param courseId 章节id
 */
export const chapterGetService = (courseId: number): Promise<ApiResponse> =>{
    return request.get("/TeacherChapterController/course/" + courseId)
}

/**
 * 新增章节
 * @param chapter 新增的章节
 */
export const chapterCreateService = (chapter: Chapter): Promise<ApiResponse> =>{
    return request.post("/TeacherChapterController/create", null, {params: chapter});
}

/**
 * 删除章节
 * @param chapterId 章节id
 */
export const chapterDeleteService = (chapterId: number): Promise<ApiResponse> =>{
    return request.delete("/TeacherChapterController/" + chapterId)
}

/**
 * 更新章节
 * @param chapter 章节实体
 */
export const chapterUpdateService = (chapter: Chapter): Promise<ApiResponse> =>{
    return request.put("/TeacherChapterController/"+ chapter.chapterId, null, {params:{
            title: chapter.title,
            order: chapter.order,
        }})
}