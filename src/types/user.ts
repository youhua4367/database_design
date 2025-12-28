export interface User {
    username: string
    password: string
}

export interface UserLogin {
    token: string
    role: number,
    username: string
}