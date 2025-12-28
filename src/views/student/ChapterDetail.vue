<template>
  <div class="container">
    <h2>{{ chapter.title }}</h2>

    <h3>视频课程</h3>
    <video width="100%" controls>
      <source :src="chapter.videoUrl" type="video/mp4" />
      你的浏览器不支持 video 标签。
    </video>

    <h3>课程资料</h3>
    <ul>
      <li v-for="r in chapter.resources" :key="r.id">
        {{ r.name }}
        <button @click="downloadResource(r)">下载</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chapter: {},
      enrolledCourseIds: [1]
    }
  },
  mounted() {
    const courseId = parseInt(this.$route.params.courseId)
    const chapterId = parseInt(this.$route.params.chapterId)

    if (!this.enrolledCourseIds.includes(courseId)) {
      alert('你未报名该课程，无法查看章节内容！')
      this.$router.push('/courses')
      return
    }

    // 假数据
    this.chapter = {
      id: chapterId,
      title: chapterId === 1 ? '关系模型基础' : 'SQL语言入门',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      resources: [
        { id: 1, name: '课件.pdf', url: '/files/kejian.pdf' },
        { id: 2, name: '练习题.doc', url: '/files/lianxi.doc' }
      ]
    }
  },
  methods: {
    downloadResource(res) {
      // 权限验证
      if (!this.enrolledCourseIds.includes(parseInt(this.$route.params.courseId))) {
        alert('你无权限下载该资料')
        return
      }
      // 模拟下载
      alert(`下载文件：${res.name}（模拟）`)
      // 真实项目可用 window.open(res.url) 或 a 标签下载
    }
  }
}
</script>
