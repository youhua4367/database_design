<template>
  <div class="container">
    <h2>我的课程</h2>

    <div class="course" v-for="c in myCourses" :key="c.courseId">
      <h3>{{ c.courseName }}</h3>
      <p>教师：{{ c.teacherName || '未知' }}</p>

      <!-- 学习进度 -->
      <div class="progress-wrapper">
        <span class="progress-text">学习进度：{{ c.progress || 0 }}%</span>
        <div class="progress-bar">
          <div
              class="progress-inner"
              :style="{ width: (c.progress || 0) + '%' }"
          ></div>
        </div>
      </div>

      <button @click="goToChapters(c)">查看章节</button>
    </div>

    <p v-if="myCourses.length === 0">暂无已报名课程</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const myCourses = ref<any[]>([])

async function fetchMyCourses() {
  try {
    const res = await axios.get('/StudentCourseController/my-courses')
    if (res.data.code === 200) {
      // 假设接口返回 Enrollment 对象，包含 course 信息和学习进度
      myCourses.value = res.data.data.map((enrollment: any) => ({
        courseId: enrollment.course.courseId,
        courseName: enrollment.course.courseName,
        teacherName: enrollment.course.teacherName || '未知',
        progress: enrollment.progress || 0
      }))
    } else {
      alert(res.data.msg)
    }
  } catch (err) {
    console.error(err)
    alert('加载已报名课程失败')
  }
}

function goToChapters(course: any) {
  router.push(`/courses/${course.courseId}`)
}

// 页面加载时请求数据
onMounted(() => {
  fetchMyCourses()
})
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
