import request from "@/utils/request.ts";
import type { ApiResponse } from "@/types/api";

/**
 * 查询所有待审核的教师认证申请
 */
export const getPendingTeacherAuthService = (): Promise<ApiResponse> => {
    return request.get("/AdminTeacherAuthController/pending");
};

/**
 * 审核教师认证
 * @param authId 认证ID
 * @param status 审核状态（0-未认证，1-审核中，2-已审核）
 */
export const approveTeacherAuthService = (
    authId: number,
    status: number
): Promise<ApiResponse> => {
    return request.put(
        `/AdminTeacherAuthController/${authId}/approve`,
        null,
        {
            params: {
                status: status,
            }
        }
    );
};
