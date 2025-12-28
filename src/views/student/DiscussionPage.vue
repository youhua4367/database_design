<template>
  <div class="container">
    <h2>{{ course.name }} - 讨论区</h2>
    <textarea v-model="content" placeholder="发表你的问题"></textarea>
    <button @click="post">发布</button>
    <div v-for="d in discussions" :key="d.id">
      <p>{{ d.user }}：{{ d.content }}</p>
    </div>
  </div>
</template>

<script>
import api from '@/api/api.js'
export default {
  data() {
    return { course: {}, discussions: [], content: '' }
  },
  async mounted() {
    const res1 = await api.getCourseDetail(this.$route.params.id)
    this.course = res1.data
    const res2 = await api.getDiscussion(this.$route.params.id)
    this.discussions = res2.data
  },
  methods: {
    async post() {
      await api.postDiscussion(this.$route.params.id, this.content)
      alert('发布成功')
      const res = await api.getDiscussion(this.$route.params.id)
      this.discussions = res.data
      this.content = ''
    }
  }
}
</script>
