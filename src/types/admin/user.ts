export interface User {
    userId: number;
    username: string;
    password: string;
    email: string;
    status: number; // 0禁用 1启用
    createTime: string;
    role: number;   // 1学生 2教师 3管理员
}
