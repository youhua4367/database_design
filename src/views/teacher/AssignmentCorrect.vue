<script setup lang="ts">
import {ref, onMounted, computed, watch} from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { useCourseStore } from "@/store/teacher/course.ts";
import { useAssignmentResultStore } from "@/store/teacher/assignment.ts";
import type { AssignmentForm } from "@/types/teacher/assignment.ts";

const route = useRoute();
// 课程id
const courseId = computed(() => Number(route.params.id));
// 作业id
const assignmentId = computed(() => Number(route.params.assignmentId));

const courseStore = useCourseStore();
const assignmentResultStore = useAssignmentResultStore();

// 弹窗可见性
const gradeDialogVisible = ref(false);

// 批改表单
const gradeForm = ref<AssignmentForm>({
    submissionId: 0,
    score: 0,
    feedback: ""
});

// 获取课程学生和作业提交
const getCourseData = async () => {
    await courseStore.getStudents(courseId.value);
    await assignmentResultStore.getSubmissionsByAssignment(assignmentId.value);
};

// 打开批改弹窗
const openGradeDialog = (studentId: number) => {
    assignmentResultStore.selectStudent(studentId, assignmentId.value);
    const selected = assignmentResultStore.selectedStudentSubmission;
    gradeForm.value = {
        submissionId: selected?.submissionId || 0,
        score: selected?.score || 0,
        feedback: selected?.feedback || ""
    };
    gradeDialogVisible.value = true;
};

// 提交批改
const submitGrade = async () => {
    await assignmentResultStore.gradeSubmission(gradeForm.value);
    gradeDialogVisible.value = false;
    ElMessage.success("批改成功！");
    await assignmentResultStore.getSubmissionsByAssignment(assignmentId.value);
};

watch(
    () => route.params.assignmentId,
    async (newVal, oldVal) => {
        if (newVal && Number(newVal) !== Number(oldVal)) {
            // 更新examId相关数据
            await getCourseData();
        }
    }
);

onMounted(async () => {
    await getCourseData();
});
</script>

<template>
    <el-container class="wrapper">
        <el-header class="header">
            <div class="left">{{ courseStore.selectedCourse?.courseName }} 作业提交列表</div>
        </el-header>

        <el-main>
            <el-table :data="courseStore.courseStudent">
                <el-table-column prop="studentId" label="学号" />
                <el-table-column label="提交内容">
                    <template #default="{ row }">
                        {{assignmentResultStore.submissions.find(s => s.studentId === row.studentId)?.content ?? "未提交" }}
                    </template>
                </el-table-column>
                <el-table-column label="分数">
                    <template #default="{ row }">
                        {{assignmentResultStore.submissions.find(s => s.studentId === row.studentId)?.score ?? "未批改" }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button
                            type="primary"
                            size="small"
                            @click="openGradeDialog(row.studentId)"
                        >
                            批改
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <el-dialog v-model="gradeDialogVisible" title="批改作业" width="30vw" center>
            <el-form :model="gradeForm" label-width="5vw">
                <el-form-item label="分数">
                    <el-input v-model="gradeForm.score" type="number" />
                </el-form-item>
                <el-form-item label="评价">
                    <el-input v-model="gradeForm.feedback" type="textarea" :rows="3" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="gradeDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitGrade">提交</el-button>
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
