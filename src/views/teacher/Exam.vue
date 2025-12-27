<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useExamStore } from "@/store/teacher/exam.ts";
import type { Exam } from "@/types/teacher/exam.ts";

const route = useRoute();
const courseId = computed(() => Number(route.params.id));

const examStore = useExamStore();

// 弹窗可见性
const addDialogVisible = ref(false);
const editDialogVisible = ref(false);

// 新增考试表单
const addForm = ref<Exam>({
    examId: 0,
    courseId: courseId.value,
    title: "",
    questionBank: "",
    totalScore: 0,
    passScore: 0,
    duration: 0,
    startTime: "",
    endTime: ""
});

// 编辑考试表单
const editForm = ref<Exam>({
    examId: 0,
    courseId: courseId.value,
    title: "",
    questionBank: "",
    totalScore: 0,
    passScore: 0,
    duration: 0,
    startTime: "",
    endTime: ""
});

// 获取考试列表
const getExams = async () => {
    await examStore.getExams(courseId.value);
}

// 新增考试
const addExam = async () => {
    await examStore.createExam(addForm.value);
    addDialogVisible.value = false;
    ElMessage.success("新增考试成功！");
}

// 选中考试并打开编辑弹窗
const editExam = (examId: number) => {
    examStore.selectExam(examId);
    const selected = examStore.selectedExam;
    if (selected) {
        editForm.value = { ...selected };
        editDialogVisible.value = true;
    }
}

// 更新考试
const updateExam = async () => {
    await examStore.updateExam(editForm.value, courseId.value);
    editDialogVisible.value = false;
    ElMessage.success("更新考试成功！");
}

// 删除考试
const deleteExam = async (examId: number) => {
    try {
        await ElMessageBox.confirm(
            "确定要删除该考试吗？删除后无法恢复",
            "提示",
            {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }
        );
        await examStore.deleteExam(examId, courseId.value);
        ElMessage.success("删除考试成功");
    } catch {
        ElMessage.info("已取消删除");
    }
}

onMounted(() => {
    getExams();
});
</script>

<template>
    <el-container class="wrapper">
        <el-header class="header">
            <div class="left">课程考试列表</div>
            <div class="right">
                <el-button type="primary" @click="addDialogVisible = true">新增考试</el-button>
            </div>
        </el-header>

        <el-main class="exam-list">
            <el-table :data="examStore.exams" style="width: 100%">
                <el-table-column type="expand">
                    <template #default="{ row }">
                        <div class="expand">
                            {{ row.questionBank }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="考试标题" />
                <el-table-column prop="totalScore" label="总分" />
                <el-table-column prop="passScore" label="及格分" />
                <el-table-column prop="duration" label="考试时长(分钟)" />
                <el-table-column prop="startTime" label="开始时间" />
                <el-table-column prop="endTime" label="结束时间" />
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button size="small" @click="editExam(row.examId)">编辑</el-button>
                        <el-button size="small" type="danger" @click="deleteExam(row.examId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <!-- 新增考试弹窗 -->
        <el-dialog v-model="addDialogVisible" title="新增考试" width="30vw" center>
            <el-form :model="addForm" label-width="5vw">
                <el-form-item label="考试标题">
                    <el-input v-model="addForm.title" placeholder="请输入考试标题" />
                </el-form-item>
                <el-form-item label="题库内容">
                    <el-input v-model="addForm.questionBank" type="textarea" :rows="4" placeholder="请输入题库内容"/>
                </el-form-item>
                <el-form-item label="总分">
                    <el-input v-model="addForm.totalScore" type="number" />
                </el-form-item>
                <el-form-item label="及格分">
                    <el-input v-model="addForm.passScore" type="number" />
                </el-form-item>
                <el-form-item label="考试时长(分钟)">
                    <el-input v-model="addForm.duration" type="number" />
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                        v-model="addForm.startTime"
                        type="datetime"
                        style="width: 100%"
                        placeholder="选择开始时间"
                        :value-format="'YYYY-MM-DDTHH:mm:ss'"
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="addForm.endTime"
                        type="datetime"
                        style="width: 100%"
                        placeholder="选择结束时间"
                        :value-format="'YYYY-MM-DDTHH:mm:ss'"
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="addDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addExam">确定</el-button>
            </template>
        </el-dialog>

        <!-- 编辑考试弹窗 -->
        <el-dialog v-model="editDialogVisible" title="编辑考试" width="30vw" center>
            <el-form :model="editForm" label-width="5vw">
                <el-form-item label="考试标题">
                    <el-input v-model="editForm.title" placeholder="请输入考试标题" />
                </el-form-item>
                <el-form-item label="题库内容">
                    <el-input v-model="editForm.questionBank" type="textarea" :rows="4" placeholder="请输入题库内容"/>
                </el-form-item>
                <el-form-item label="总分">
                    <el-input v-model="editForm.totalScore" type="number" />
                </el-form-item>
                <el-form-item label="及格分">
                    <el-input v-model="editForm.passScore" type="number" />
                </el-form-item>
                <el-form-item label="考试时长(分钟)">
                    <el-input v-model="editForm.duration" type="number" />
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                        v-model="editForm.startTime"
                        type="datetime"
                        style="width: 100%"
                        placeholder="选择开始时间"
                        :value-format="'YYYY-MM-DDTHH:mm:ss'"
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="editForm.endTime"
                        type="datetime"
                        style="width: 100%"
                        placeholder="选择结束时间"
                        :value-format="'YYYY-MM-DDTHH:mm:ss'"
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="editDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="updateExam">确定</el-button>
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

        .right .el-button {
            background-color: #1e88e5;
            color: #fff;
            border: none;

            &:hover {
                background-color: #1565c0;
            }
        }
    }

    .exam-list {
        .el-table {
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            .el-table__row {
                &:hover {
                    background-color: #e8f4ff;
                }
            }

            .expand {
                background-color: #f9fafe;
                border-left: 3px solid #1e88e5;
                padding: 1vw;
                white-space: pre-wrap;
                border-radius: 4px;
                font-size: 0.95rem;
                color: #333;
            }
        }

        .el-button {
            font-size: 0.85rem;
            margin-right: 0.5rem;
            border-radius: 4px;
            background-color: #1e88e5;
            color: #fff;
            border: none;
            &:hover {
                background-color: #1565c0;
            }
        }
    }
}
</style>
