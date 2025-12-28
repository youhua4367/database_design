import request from "@/utils/request.ts";
import type { ApiResponse } from "@/types/api";

/**
 * 查询所有分类
 */
export const categoryListService = (): Promise<ApiResponse> => {
    return request.get("/AdminCategoryController/list");
};

/**
 * 创建分类
 * @param categoryName 分类名称
 */
export const categoryCreateService = (categoryName: string): Promise<ApiResponse> => {
    return request.post("/AdminCategoryController/create", null, { params: { categoryName: categoryName } });
};

/**
 * 更新分类
 * @param categoryId 分类ID
 * @param categoryName 新的分类名称
 */
export const categoryUpdateService = (categoryId: number, categoryName: string): Promise<ApiResponse> => {
    return request.put(`/AdminCategoryController/${categoryId}`, null, { params: { categoryName: categoryName } });
};

/**
 * 删除分类
 * @param categoryId 分类ID
 */
export const categoryDeleteService = (categoryId: number): Promise<ApiResponse> => {
    return request.delete(`/AdminCategoryController/${categoryId}`);
};
