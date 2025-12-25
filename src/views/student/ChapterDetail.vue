<template>
  <div class="container">
    <h2>{{ chapter.title }}</h2>
    <h3>视频课程</h3>
    <video width="100%" controls>
      <source :src="chapter.videoUrl" type="video/mp4">
      你的浏览器不支持 video 标签
    </video>

    <h3>课程资料</h3>
    <ul>
      <li v-for="r in chapter.resources" :key="r.id">
        {{ r.name }} <button @click="download(r)">下载</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const courseId = Number(route.params.courseId)
const chapterId = Number(route.params.chapterId)
const enrolledCourseIds = [1]
if (!enrolledCourseIds.includes(courseId)) {
  alert('你未报名该课程，无法查看章节内容！')
  router.push('/student/courses')
}

const chapter = {
  id: chapterId,
  title: chapterId === 1 ? '关系模型基础' : 'SQL语言入门',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  resources: [
    { id: 1, name: '课件.pdf', url: '/files/kejian.pdf' },
    { id: 2, name: '练习题.doc', url: '/files/lianxi.doc' }
  ]
}

function download(res: typeof chapter.resources[0]) {
  alert(`下载文件：${res.name}（模拟）`)
}
</script>
