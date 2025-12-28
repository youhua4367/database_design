import request from "@/utils/request.ts";
import type { ApiResponse } from "@/types/api";

/**
 * 查询所有用户
 */
export const getAllUsersService = (): Promise<ApiResponse> => {
    return request.get("/AdminController/users");
};

/**
 * 根据角色查询用户
 * @param role 角色 1学生 2教师 3管理员
 */
export const getUsersByRoleService = (role: number): Promise<ApiResponse> => {
    return request.get(`/AdminController/users/role/${role}`);
};

/**
 * 修改用户状态
 * @param userId 用户ID
 * @param status 状态 0禁用 1启用
 */
export const updateUserStatusService = (userId: number, status: number): Promise<ApiResponse> => {
    return request.put(`/AdminController/users/${userId}/status`, null, {
        params: { status }
    });
}

/**
 * 删除用户
 * @param userId 用户ID
 */
export const deleteUserService = (userId: number): Promise<ApiResponse> => {
    return request.delete(`/AdminController/users/${userId}`);
};
