<template>
  <div class="container">
    <h2>学习进度</h2>
    <div v-for="p in progress.courses" :key="p.courseId">
      <p>{{ p.courseName }} - 已完成章节：{{ p.completed }} / {{ p.total }}</p>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return { progress: { courses: [] } }
  },
  async mounted() {
    this.progress = [
      { courseId: 1, courseName: '数据库原理', completed: 5, total: 10 },
      { courseId: 2, courseName: '操作系统', completed: 3, total: 10 }
    ]
  }
}
</script>
