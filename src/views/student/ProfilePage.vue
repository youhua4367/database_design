<template>
  <div class="profile-page">
    <h2>个人中心</h2>

    <el-card class="profile-card">
      <div class="avatar-section">
        <el-avatar :size="100" :src="user.avatar" />
        <el-button size="small" @click="changeAvatar">修改头像</el-button>
      </div>

      <div class="info-section">
        <el-form :model="user" label-width="100px">
          <el-form-item label="用户名">
            <el-input v-model="user.name" disabled />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="user.email" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="user.phone" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveProfile">保存修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="stats-card">
      <h3>学习统计</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="stat-item">
            <div class="number">{{ stats.completedCourses }}</div>
            <div class="label">已学课程</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="stat-item">
            <div class="number">{{ stats.pendingAssignments }}</div>
            <div class="label">待交作业</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="stat-item">
            <div class="number">{{ stats.submittedAssignments }}</div>
            <div class="label">已交作业</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 模拟用户数据
const user = ref({
  avatar: 'https://i.pravatar.cc/100',
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '13800138000'
})

// 学习统计
const stats = ref({
  completedCourses: 5,
  pendingAssignments: 2,
  submittedAssignments: 8
})

const changeAvatar = () => {
  ElMessage.info('点击修改头像功能，可跳转上传页面')
}

const saveProfile = () => {
  ElMessage.success('个人信息已保存')
}
</script>

<style scoped>
.profile-page {
  padding: 20px;
}

.profile-card {
  display: flex;
  margin-bottom: 20px;
  padding: 20px;
  gap: 40px;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.info-section {
  flex: 1;
}

.stats-card {
  padding: 20px;
}

.stat-item {
  text-align: center;
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
}

.stat-item .number {
  font-size: 24px;
  font-weight: bold;
}

.stat-item .label {
  margin-top: 5px;
  color: #606266;
}
</style>
