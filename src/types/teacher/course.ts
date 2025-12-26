export interface Course {
    courseId: number;
    teacherId: number;
    courseName: string;
    description: string;
    categoryName: string;
    status: number;
    createTime: number;
    updateTime: number;
}

export interface CoursePost {
    courseName: string;
    description: string;
    categoryName: string;
}

export interface CourseStudent {
    enrollId: number;
    studentId: number;
    courseId: number;
    courseName: string;
    enrollTime: string
    teacherId: number;
    teacherName: string;
}
