import request from "@/utils/request.ts"
import type { ApiResponse } from "@/types/api"
import type { User, RegisterParams, UpdateProfileParams } from "@/types/user.ts"

/**
 * 用户登录
 */
export const userLoginService = (user: User): Promise<ApiResponse> => {
    return request.post(
        "/UserController/login",
        null,
        {
            params: user
        }
    )
}

/**
 * 修改个人资料
 */
export const updateUserProfileService = (
    params: UpdateProfileParams
): Promise<ApiResponse> => {
    return request.put(
        "/UserController/profile",
        null,
        {
            params
        }
    )
}

/**
 * 修改密码
 */
export const updateUserPasswordService = (
    oldPassword: string,
    newPassword: string
): Promise<ApiResponse> => {
    return request.put(
        "/UserController/password",
        null,
        {
            params: {
                oldPassword,
                newPassword
            }
        }
    )
}

/**
 * 用户注册
 */
export const userRegisterService = (
    params: RegisterParams
): Promise<ApiResponse> => {
    return request.post(
        "/UserController/register",
        null,
        {
            params
        }
    )
}

export const userInfoService = (): Promise<ApiResponse> => {
    return request.get("/UserController/info");
};
