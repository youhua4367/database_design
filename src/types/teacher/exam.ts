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
