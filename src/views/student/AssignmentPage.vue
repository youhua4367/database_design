<template>
  <div class="assignment-page">
    <h2>作业管理</h2>

    <!-- Tabs -->
    <el-tabs v-model="activeTab">
      <!-- 待交作业 -->
      <el-tab-pane label="待交作业" name="pending">
        <el-table :data="pendingAssignments" style="width: 100%">
          <el-table-column prop="title" label="作业名称" width="180"/>
          <el-table-column prop="deadline" label="截止日期" width="180"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                  type="primary"
                  size="small"
                  @click="$router.push({ name: 'AssignmentSubmit', params: { assignmentId: scope.row.id } })"
              >
                提交作业
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 已交作业 -->
      <el-tab-pane label="已交作业" name="submitted">
        <el-table :data="submittedAssignments" style="width: 100%">
          <el-table-column prop="title" label="作业名称" width="180"/>
          <el-table-column prop="submit_time" label="提交时间" width="180"/>
          <el-table-column prop="grade" label="分数" width="100"/>
          <el-table-column prop="status" label="状态" width="120"/>
          <el-table-column prop="feedback" label="教师反馈"/>
        </el-table>
      </el-tab-pane>



    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Tabs 控制
const activeTab = ref("pending");

// 假数据
const allAssignments = ref([
  { id: 1, title: "数据库作业1", status: "待交", deadline: "2025-12-30", submit_time: "", grade: null, feedback: "" },
  { id: 2, title: "操作系统作业1", status: "已交", deadline: "2025-12-20", submit_time: "2025-12-18", grade: 90, feedback: "不错" },
  { id: 3, title: "网络课程作业", status: "待交", deadline: "2025-12-28", submit_time: "", grade: null, feedback: "" },
  { id: 4, title: "算法课程作业", status: "已交", deadline: "2025-12-22", submit_time: "2025-12-21", grade: 85, feedback: "可以更优化" }
]);

const pendingAssignments = ref([]);
const submittedAssignments = ref([]);

// 刷新 Tabs 数据
const refreshAssignments = () => {
  pendingAssignments.value = allAssignments.value.filter(a => a.status === "待交");
  submittedAssignments.value = allAssignments.value.filter(a => a.status === "已交");
};

onMounted(() => {
  refreshAssignments();
});
</script>

<style scoped>
.assignment-page {
  padding: 20px;
}

/* 表格内容和表头居中 */
.el-table th,
.el-table td {
  text-align: center !important;
  vertical-align: middle !important;
}

/* 如果有操作列按钮，保证按钮居中 */
.el-table-column--operation .cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.el-table-column--operation .cell .el-button {
  margin: 0;
}


</style>
