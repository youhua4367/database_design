export interface Course {
    courseId: number;
    teacherId: number;
    courseName: string;
    description: string;
    categoryName: string;
    status: number;          // 0=未审核, 1=审核中, 2=已通过
    createTime: string;
    updateTime: string;
}
