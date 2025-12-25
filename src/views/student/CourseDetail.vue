<template>
  <div class="container">
    <h2>{{ course.name }} - 章节列表</h2>
    <ul>
      <li v-for="ch in chapters" :key="ch.id">
        {{ ch.title }}
        <button @click="goToStudy(ch)">学习</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()

const courseId = Number(route.params.courseId)

// 模拟课程数据
const course = ref({ id: courseId, name: courseId === 1 ? '数据库原理' : '操作系统' })

// 模拟章节数据
const chapters = ref([
  { id: 1, title: '关系模型基础' },
  { id: 2, title: 'SQL语言入门' },
  { id: 3, title: '索引与查询优化' }
])

function goToStudy(chapter: typeof chapters.value[0]) {
  router.push(`${courseId}/chapter/${chapter.id}`)
}
</script>

<style scoped>
.container {
  padding: 20px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
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


