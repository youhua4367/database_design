// 课程信息
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

// 课程信息表单
export interface CoursePost {
    courseName: string;
    description: string;
    categoryName: string;
}

// 课程学生信息
export interface CourseStudent {
    enrollId: number;
    studentId: number;
    courseId: number;
    courseName: string;
    enrollTime: string
    teacherId: number;
    teacherName: string;
}
