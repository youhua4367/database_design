import request from "@/utils/request.ts"
import type { ApiResponse } from "@/types/api"
import type {User} from "@/types/user.ts"


export const userLoginService = (user: User): Promise<ApiResponse> => {
    return request.post("/UserController/login", null, {params: user});
}


export function userRegisterService(data: any) {
    return axios.post('/UserController/register', null, { params: data })
        .then(res => res.data)
}