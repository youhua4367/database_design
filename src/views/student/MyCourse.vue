<template>
  <div class="container">
    <h2>我的课程</h2>

    <div class="course" v-for="c in myCourses" :key="c.id">
      <h3>{{ c.name }}</h3>
      <p>教师：{{ c.teacher }}</p>

      <!-- 学习进度 -->
      <div class="progress-wrapper">
        <span class="progress-text">学习进度：{{ c.progress }}%</span>
        <div class="progress-bar">
          <div
              class="progress-inner"
              :style="{ width: c.progress + '%' }"
          ></div>
        </div>
      </div>

      <button @click="goToChapters(c)">查看章节</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

// 模拟已报名课程 + 学习进度
const myCourses = [
  { id: 1, name: '数据库原理', teacher: '张老师', progress: 60 },
  { id: 2, name: '操作系统', teacher: '李老师', progress: 30 }
]

const router = useRouter()

function goToChapters(course: typeof myCourses[0]) {
  router.push(`courses/${course.id}`)
}
</script>


<style scoped>
.container {
  padding: 20px;
}

.course {
  border: 1px solid #ccc;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 6px;
}

.progress-wrapper {
  margin: 10px 0;
}

.progress-text {
  font-size: 14px;
  margin-bottom: 4px;
  display: block;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #ebeef5;
  border-radius: 5px;
  overflow: hidden;
}

.progress-inner {
  height: 100%;
  background-color: #409eff;
  transition: width 0.3s ease;
}

button {
  margin-top: 8px;
  padding: 6px 12px;
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
