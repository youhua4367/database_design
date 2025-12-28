<script setup lang="ts">
import {ref, onMounted, computed, watch} from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { useCourseStore } from "@/store/teacher/course.ts";
import { useExamResultStore } from "@/store/teacher/exam.ts";
import type { ExamForm } from "@/types/teacher/exam.ts";

const route = useRoute();
// 课程id
const courseId = computed(() => Number(route.params.id));
// 考试id
const examId = computed(() => Number(route.params.examId));

const courseStore = useCourseStore();
const examResultStore = useExamResultStore();

// 弹窗可见性
const scoreDialogVisible = ref(false);

// 录入成绩表单
const scoreForm = ref<ExamForm>({
    examId: examId.value,
    studentId: 0,
    grade: 0,
    feedback: ""
});

// 获取课程学生
const getStudents = async () => {
    await courseStore.getStudents(courseId.value);
};

// 获取考试成绩
const getResults = async () => {
    if (examId.value) {
        examResultStore.selectExam(examId.value);
        await examResultStore.getResultsByExam(examId.value);
    }
};

// 打开录入成绩弹窗
const openScoreDialog = (studentId: number) => {
    examResultStore.selectStudent(studentId, examId.value);
    const selectedStudent = examResultStore.selectedStudentResult;
    scoreForm.value = {
        examId: selectedStudent?.examId || 0,
        studentId: selectedStudent?.studentId || 0,
        grade: selectedStudent?.grade || 0,
        feedback: selectedStudent?.feedback || '',
    }
    scoreDialogVisible.value = true;
};

// 提交成绩
const submitScore = async () => {
    await examResultStore.createResult(scoreForm.value);
    scoreDialogVisible.value = false;
    ElMessage.success("成绩录入成功！");
    await getResults();
};

watch(
    () => route.params.examId,
    async (newVal, oldVal) => {
        if (newVal && Number(newVal) !== Number(oldVal)) {
            // 更新examId相关数据
            await getResults();
        }
    }
);

onMounted(async () => {
    await getStudents();
    await getResults();
});
</script>

<template>
    <el-container class="wrapper">
        <el-header class="header">
            <div class="left">{{ courseStore.selectedCourse?.courseName }}  课程考试成绩</div>
        </el-header>

        <el-main>
            <el-table :data="courseStore.courseStudent">
                <el-table-column prop="studentId" label="学号" />
                <el-table-column label="成绩">
                    <template #default="{ row }">
                        {{ examResultStore.results.find(r => r.studentId === row.studentId)?.grade ?? "未录入" }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button
                            type="primary"
                            size="small"
                            @click="openScoreDialog(row.studentId)"
                        >
                            {{ examResultStore.selectedStudentResult ? "修改成绩" : "录入成绩" }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <!-- 成绩录入弹窗 -->
        <el-dialog v-model="scoreDialogVisible" title="录入成绩" width="30vw" center>
            <el-form :model="scoreForm" label-width="5vw">
                <el-form-item label="成绩">
                    <el-input v-model="scoreForm.grade" type="number" min="0" />
                </el-form-item>
                <el-form-item label="反馈">
                    <el-input v-model="scoreForm.feedback" type="textarea" :rows="3" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="scoreDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitScore">提交</el-button>
            </template>
        </el-dialog>
    </el-container>
</template>

<style scoped lang="scss">
.wrapper {
    width: 100%;
    height: 100%;
    padding: 1vh 1vw;
    background-color: #f5f7fa;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 1vh 2vw;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 1vh;

        .left {
            font-size: 1.5rem;
            font-weight: bold;
        }
    }
}
</style>
