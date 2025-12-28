// 登录用接口
export interface User {
    username: string
    password: string
}

// 登录用接口
export interface UserLogin {
    token: string
    role: number,
    username: string
}

// 用户信息接口
export interface UserProfile {
    userId: number
    username: string
    email: string
    status: number
    role: number
    createTime: string
}

// 老师信息接口
export interface TeacherProfile {
    teacherId: number
    name: string
    title: string
    intro: string
    gender: number // 0-女 1-男
}

// 更新信息用接口
export interface UpdateProfileParams {
    email: string
    name: string
    gender: number
    phone: string
    title: string
    intro: string
}

// 注册用接口
export interface RegisteredUser {
    userId: number
    username: string
    email: string
    status: number
    role: number
    createTime: string
}

export interface RegisterParams {
    username: string
    password: string
    email?: string
    role?: number   // 1学生 2教师
    material?: string
}
