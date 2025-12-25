<template>
  <div class="course-enroll">
    <el-card class="course-info">
      <h2>{{ course.name }}</h2>
      <p>教师：{{ course.teacher }}</p>
      <p>价格：￥{{ course.price }}</p>
      <p>简介：{{ course.description }}</p>
    </el-card>

    <div class="actions">
      <el-button
          type="primary"
          :disabled="isEnrolled"
          @click="enrollCourse"
      >
        {{ isEnrolled ? '已报名' : '立即报名' }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 模拟课程数据（实际可用 API 替换）
const courses = [
  { id: 1, name: '数据库原理', teacher: '张老师', price: 99, category: '计算机' },
  { id: 2, name: '操作系统', teacher: '李老师', price: 89, category: '计算机' },
  { id: 3, name: '心理学入门', teacher: '王老师', price: 59, category: '文科' },
  { id: 4, name: '哲学基础', teacher: '刘老师', price: 49, category: '文科' }
]

const route = useRoute()
const router = useRouter()
const courseId = Number(route.params.courseId)

const course = ref({})
const isEnrolled = ref(false)

onMounted(() => {
  // 获取课程信息
  const c = courses.find(c => c.id === courseId)
  if (c) course.value = c

  // 检查是否报名（模拟，可以换成 Pinia 或 API）
  const enrolledCourses = JSON.parse(localStorage.getItem('enrolled') || '[]')
  isEnrolled.value = enrolledCourses.includes(courseId)
})

// 报名函数
const enrollCourse = () => {
  if (!isEnrolled.value) {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolled') || '[]')
    enrolledCourses.push(courseId)
    localStorage.setItem('enrolled', JSON.stringify(enrolledCourses))
    isEnrolled.value = true

    ElMessage.success('报名成功！')

    // 跳转到课程详情
    router.push(`/home/courses/${courseId}`)
  }
}
</script>

<style scoped>
.course-enroll {
  padding: 20px;
}

.course-info {
  margin-bottom: 20px;
}

.actions {
  text-align: center;
}
</style>
