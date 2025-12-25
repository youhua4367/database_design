<template>
  <div class="assignment-submit">
    <h2>提交作业: {{ assignment.title }}</h2>

    <el-form :model="submission">
      <el-form-item label="作业内容">
        <el-input type="textarea" v-model="submission.content" placeholder="输入作业内容"/>
      </el-form-item>

      <el-form-item label="上传文件">
        <el-upload
            action="#"
            :file-list="fileList"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
        >
          <el-button>上传文件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">提交作业</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 获取路由参数
const route = useRoute()
const router = useRouter()
const assignmentId = route.params.assignmentId

// 假数据
const allAssignments = [
  { id: 1, title: "数据库作业1" },
  { id: 2, title: "操作系统作业1" },
  { id: 3, title: "网络课程作业" },
]

const assignment = allAssignments.find(a => a.id == assignmentId) || { title: "未知作业" }

const submission = ref({ content: "", file_path: "" })
const fileList = ref([])

const handleUploadSuccess = () => {
  submission.value.file_path = "模拟文件路径"
}

const beforeUpload = (file) => {
  if (file.size / 1024 / 1024 > 5) {
    ElMessage.error("文件不能超过5MB")
    return false
  }
  return true
}

const submit = () => {
  ElMessage.success("作业提交成功")
  router.push('/home/assignment') // 提交后返回作业列表
}
</script>
