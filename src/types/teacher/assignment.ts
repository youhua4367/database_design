export interface Assignment {
    assignmentId?: number;   // 新增时可以不传
    courseId: number;
    title: string;
    content: string;
    type: number;            // 作业类型（1选择题，2填空题，3问答题）
    deadline: string;
}
