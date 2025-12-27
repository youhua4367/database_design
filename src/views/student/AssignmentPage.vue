<template>
  <div class="assignment-page">
    <h2>作业管理</h2>

    <!-- Tabs -->
    <el-tabs v-model="activeTab">
      <!-- 待交作业 -->
      <el-tab-pane label="待交作业" name="pending">
        <el-table :data="pendingAssignments" style="width: 100%">
          <el-table-column prop="title" label="作业名称" width="200"/>
          <el-table-column prop="deadline" label="截止日期" width="180"/>
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button
                  type="primary"
                  size="small"
                  @click="goToSubmit(scope.row)"
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
          <el-table-column prop="title" label="作业名称" width="200"/>
          <el-table-column prop="submitTime" label="提交时间" width="180"/>
          <el-table-column prop="score" label="分数" width="100"/>
          <el-table-column prop="feedback" label="教师反馈"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const activeTab = ref('pending')

const pendingAssignments = ref<any[]>([])
const submittedAssignments = ref<any[]>([])

// 获取当前学生的作业提交记录
async function fetchAssignments() {
  try {
    const res = await axios.get('/StudentSubmissionController/my-submissions')
    if (res.data.code === 200) {
      const submissions: any[] = res.data.data

      pendingAssignments.value = submissions
          .filter(s => !s.submitTime) // 未提交
          .map(s => ({
            id: s.assignmentId,
            title: s.title,
            deadline: s.deadline
          }))

      submittedAssignments.value = submissions
          .filter(s => s.submitTime) // 已提交
          .map(s => ({
            id: s.assignmentId,
            title: s.title,
            submitTime: s.submitTime,
            score: s.score,
            feedback: s.feedback
          }))
    } else {
      alert(res.data.msg)
    }
  } catch (err) {
    console.error(err)
    alert('加载作业失败')
  }
}

function goToSubmit(assignment: any) {
  router.push({ name: 'AssignmentSubmit', params: { assignmentId: assignment.id } })
}

onMounted(() => {
  fetchAssignments()
})
</script>

<style scoped>
.assignment-page { padding: 16px; }
</style>


<style scoped>
.assignment-page {
  padding: 16px;
}
</style>

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
