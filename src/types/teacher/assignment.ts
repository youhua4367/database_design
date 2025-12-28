// 作业
export interface Assignment {
    assignmentId: number;   // 新增时可以不传
    courseId: number;
    title: string;
    content: string;
    type: number;            // 作业类型（1选择题，2填空题，3问答题）
    deadline: string;
}

// 作业的数据
export interface AssignmentResult {
    submissionId: number;
    assignmentId: number;
    studentId: number;
    content: string;
    submitTime: string;
    score: number;
    feedback: string;
}

// 批改作业的表单
export interface AssignmentForm {
    submissionId: number;
    score: number;
    feedback: string;
}
