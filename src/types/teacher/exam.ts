// 布置考试接口
export interface Exam {
    examId: number;
    courseId: number;
    title: string;
    questionBank: string;  // 题库/题目内容
    totalScore: number;
    passScore: number;
    duration: number; // 考试时长（分钟）
    startTime: string; // yyyy-MM-ddTHH:mm:ss
    endTime: string;   // yyyy-MM-ddTHH:mm:ss
}

// 考试结果接口
export interface ExamResult {
    resultId: number;
    examId: number;
    studentId: number;
    courseId: number;
    courseName: string;
    grade: number;
    feedback: string;
    answer: string;
}

// 成绩表单
export interface ExamForm {
    studentId: number;
    examId: number;
    grade: number;
    feedback: string;
}