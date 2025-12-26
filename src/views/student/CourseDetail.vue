<template>
  <div class="container">
    <h2>{{ course.name }} - 章节列表</h2>
    <ul>
      <li v-for="ch in chapters" :key="ch.id" class="chapter-item">


        <!-- 章节标题 -->
        <span class="chapter-title">{{ ch.title }}</span>

        <span class="chapter-progress">
          <span v-if="ch.progress === 100" class="done">已完成</span>
          <span v-else-if="ch.progress === 0" class="not-start">未学习</span>
          <span v-else class="doing">{{ ch.progress }}%</span>
        </span>

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

// 模拟章节数据，增加 progress 字段表示学习进度
const chapters = ref([
  { id: 1, title: '关系模型基础', progress: 100 },
  { id: 2, title: 'SQL语言入门', progress: 50 },
  { id: 3, title: '索引与查询优化', progress: 0 }
])

function goToStudy(chapter) {
  router.push(`/courses/${courseId}/chapter/${chapter.id}`)
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
