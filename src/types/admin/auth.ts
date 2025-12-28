export interface TeacherAuth {
    authId: number;
    teacherId: number;
    material: string;
    status: number;      // 0-未认证，1-审核中，2-已审核
    applyTime: string;
}
