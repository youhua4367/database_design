<template>
  <div class="submit-page">
    <h2>提交作业：{{ assignment?.title || '加载中...' }}</h2>
    <p>截止日期：{{ assignment?.deadline || '-' }}</p>

    <el-input
        type="textarea"
        v-model="content"
        rows="6"
        placeholder="在这里输入作业答案"
    ></el-input>

    <el-button type="primary" @click="submitAssignment" style="margin-top: 12px;">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const assignmentId = Number(route.params.assignmentId)

const assignment = ref<any>(null)
const content = ref('')

// 获取作业详情
async function fetchAssignmentDetail() {
  try {
    const res = await axios.get(`/StudentSubmissionController/assignment/${assignmentId}`)
    if (res.data.code === 200) {
      assignment.value = res.data.data
      if (res.data.data.content) content.value = res.data.data.content
    } else {
      alert(res.data.msg)
    }
  } catch (err) {
    console.error(err)
    alert('加载作业失败')
  }
}

// 提交作业
async function submitAssignment() {
  try {
    const res = await axios.post('/StudentSubmissionController/submit', null, {
      params: {
        assignmentId,
        content: content.value
      }
    })
    if (res.data.code === 200) {
      alert('提交成功')
      router.back() // 返回上一页
    } else {
      alert(res.data.msg)
    }
  } catch (err) {
    console.error(err)
    alert('提交失败')
  }
}

onMounted(() => {
  fetchAssignmentDetail()
})
</script>

<style scoped>
.submit-page { padding: 16px; }
</style>
