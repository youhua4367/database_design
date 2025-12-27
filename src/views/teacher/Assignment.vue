<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useAssignmentStore } from "@/store/teacher/assignment.ts";
import type { Assignment } from "@/types/teacher/assignment.ts";

const route = useRoute();
const courseId = computed(() => Number(route.params.id));

const assignmentStore = useAssignmentStore();

// 弹窗可见性
const addDialogVisible = ref(false);
const editDialogVisible = ref(false);

// 新增作业表单
const addForm = ref<Assignment>({
    assignmentId: 0,
    courseId: courseId.value,
    title: "",
    content: "",
    type: 1,
    deadline: ""
});

// 编辑作业表单
const editForm = ref<Assignment>({
    assignmentId: 0,
    courseId: courseId.value,
    title: "",
    content: "",
    type: 1,
    deadline: ""
});

// 获取作业列表
const getAssignments = async () => {
    await assignmentStore.getAssignments(courseId.value);
}

// 新增作业
const addAssignment = async () => {
    console.log(addForm.value.deadline);
    await assignmentStore.createAssignment(addForm.value);
    addDialogVisible.value = false;
    ElMessage.success("新增作业成功！");
}

// 选中作业并打开编辑弹窗
const editAssignment = (assignmentId: number) => {
    assignmentStore.selectAssignment(assignmentId);
    const selected = assignmentStore.selectedAssignment;
    if (selected) {
        editForm.value = { ...selected };
        editDialogVisible.value = true;
    }
}

// 更新作业
const updateAssignment = async () => {
    await assignmentStore.updateAssignment(editForm.value, courseId.value);
    editDialogVisible.value = false;
    ElMessage.success("更新作业成功！");
}

// 删除作业
const deleteAssignment = async (assignmentId: number) => {
    try {
        await ElMessageBox.confirm(
            "确定要删除该作业吗？删除后无法恢复",
            "提示",
            {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }
        );
        await assignmentStore.deleteAssignment(assignmentId, courseId.value);
        ElMessage.success("删除作业成功");
    } catch {
        ElMessage.info("已取消删除");
    }
}

onMounted(() => {
    getAssignments();
});
</script>


<template>
    <el-container class="wrapper">
        <el-header class="header">
            <div class="left">已布置的作业</div>
            <div class="right">
                <el-button type="primary" @click="addDialogVisible = true">新增作业</el-button>
            </div>
        </el-header>

        <el-main class="assignment-list">
            <el-table :data="assignmentStore.assignments" style="width: 100%">
                <el-table-column type="expand">
                    <template #default="{ row }">
                        <div class="expand">
                            {{ row.content }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="作业标题" />
                <el-table-column prop="type" label="作业类型" />
                <el-table-column prop="deadline" label="截止时间" />
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button size="small" @click="editAssignment(row.assignmentId)">编辑</el-button>
                        <el-button size="small" type="danger" @click="deleteAssignment(row.assignmentId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <!-- 新增作业弹窗 -->
        <el-dialog v-model="addDialogVisible" title="新增作业" width="30vw" center>
            <el-form :model="addForm" label-width="5vw">
                <el-form-item label="作业标题">
                    <el-input v-model="addForm.title" placeholder="请输入作业标题" />
                </el-form-item>
                <el-form-item label="作业类型">
                    <el-select v-model="addForm.type" placeholder="请选择类型">
                        <el-option label="选择题" :value="1" />
                        <el-option label="填空题" :value="2" />
                        <el-option label="问答题" :value="3" />
                    </el-select>
                </el-form-item>
                <el-form-item label="截止时间">
                    <el-date-picker
                        v-model="addForm.deadline"
                        type="datetime"
                        placeholder="选择截止时间"
                        style="width: 100%"
                        :value-format="'YYYY-MM-DDTHH:mm:ss'"
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                </el-form-item>
                <el-form-item label="作业内容">
                    <el-input v-model="addForm.content" placeholder="请输入作业内容" :rows="4" type="textarea"/>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="addDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addAssignment">确定</el-button>
            </template>
        </el-dialog>

        <!-- 编辑作业弹窗 -->
        <el-dialog v-model="editDialogVisible" title="编辑作业" width="30vw" center>
            <el-form :model="editForm" label-width="5vw">
                <el-form-item label="作业标题">
                    <el-input v-model="editForm.title" placeholder="请输入作业标题" />
                </el-form-item>
                <el-form-item label="作业类型">
                    <el-select v-model="editForm.type" placeholder="请选择类型">
                        <el-option label="选择题" :value="1" />
                        <el-option label="填空题" :value="2" />
                        <el-option label="问答题" :value="3" />
                    </el-select>
                </el-form-item>
                <el-form-item label="截止时间">
                    <el-date-picker
                        v-model="editForm.deadline"
                        type="datetime"
                        placeholder="选择截止时间"
                        style="width: 100%"
                        :value-format="'YYYY-MM-DDTHH:mm:ss'"
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                </el-form-item>
                <el-form-item label="作业内容">
                    <el-input v-model="editForm.content" placeholder="请输入作业内容" :rows="4" type="textarea" autocomplete="off"/>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="editDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="updateAssignment">确定</el-button>

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

    .assignment-list {
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
        }

        .el-button {
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
