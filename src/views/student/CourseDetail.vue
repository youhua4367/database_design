<template>
  <div class="container">
    <h2>{{ course?.courseName || '加载中...' }} - 章节列表</h2>

    <ul v-if="chapters.length > 0">
      <li v-for="ch in chapters" :key="ch.chapterId" class="chapter-item">
        <span class="chapter-title">{{ ch.title }}</span>
        <button @click="goToStudy(ch)">学习</button>
      </li>
    </ul>

    <p v-else>暂无章节信息</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const courseId = Number(route.params.courseId)

const course = ref<any>(null)
const chapters = ref<any[]>([])

async function fetchCourseDetail() {
  try {
    const res = await axios.get(`/StudentCourseController/${courseId}`)
    if (res.data.code === 200) {
      course.value = res.data.data
      chapters.value = res.data.data.chapters || []
    } else {
      alert(res.data.msg)
    }
  } catch (err) {
    console.error(err)
    alert('加载课程信息失败')
  }
}

function goToStudy(chapter: any) {
  router.push(`/courses/${courseId}/chapter/${chapter.chapterId}`)
}

onMounted(() => {
  fetchCourseDetail()
})
</script>



<style scoped>
.container {
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

.chapter-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  /* 新增美化 */
  border: 1px solid #dcdfe6;   /* 浅灰边框 */
  border-radius: 6px;           /* 圆角 */
  padding: 10px;                /* 内边距 */
  background-color: #f9fafc;    /* 浅背景色 */
  transition: all 0.3s;         /* 悬停动画 */
}


.chapter-progress {
  width: 60px;
  text-align: center;
  font-weight: bold;
}

.done {
  color: #67c23a;
}

.not-start {
  color: #c0c4cc;
}

.doing {
  color: #409eff;
}

.chapter-title {
  flex: 1;
  margin-left: 10px;
}

button {
  margin-left: 10px;
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
