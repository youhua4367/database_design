<template>
  <div class="container">
    <h2>{{ course.name }} - 章节列表</h2>
    <p>教师：{{ course.teacher }}</p>

    <ul>
      <li v-for="ch in chapters" :key="ch.id">
        <span>{{ ch.title }}</span>
        <button @click="goChapter(ch)">查看详情</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      course: {},
      chapters: [],
      enrolledCourseIds: [1] // 假设学生已报名的课程
    }
  },
  mounted() {
    const courseId = parseInt(this.$route.params.courseId)
    if (!this.enrolledCourseIds.includes(courseId)) {
      alert('你未报名该课程，无法查看章节内容！')
      this.$router.push('/courses')
      return
    }

    // 假数据
    if (courseId === 1) {
      this.course = { id: 1, name: '数据库原理', teacher: '张老师' }
      this.chapters = [
        { id: 1, title: '关系模型基础' },
        { id: 2, title: 'SQL语言入门' }
      ]
    }
  },
  methods: {
    goChapter(chapter) {
      this.$router.push(`/course/${this.course.id}/chapter/${chapter.id}`)
    }
  }
}
</script>

