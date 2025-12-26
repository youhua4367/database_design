import request from "@/utils/request.ts"
import type { ApiResponse } from "@/types/api"

export const categoryGetService = (): Promise<ApiResponse> => {
    return request.get("/UserCategoryController/list");
}