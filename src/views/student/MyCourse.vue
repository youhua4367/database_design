<template>
  <div class="container">
    <h2>我的课程</h2>
    <div class="course" v-for="c in myCourses" :key="c.id">
      <h3>{{ c.name }}</h3>
      <p>教师：{{ c.teacher }}</p>
      <button @click="goToChapters(c)">查看章节</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

// 模拟已报名课程
const myCourses = [
  { id: 1, name: '数据库原理', teacher: '张老师' },
  { id: 2, name: '操作系统', teacher: '李老师' }
]

const router = useRouter()

function goToChapters(course: typeof myCourses[0]) {
  // 跳转到课程详情（章节列表）
  router.push(`courses/${course.id}`)
}
</script>

<style scoped>
.container {
  padding: 20px;
}
.course {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
}
button {
  padding: 5px 10px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #66b1ff;
}
</style>
