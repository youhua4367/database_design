<template>
  <div class="container">
    <h2>{{ course.name }} - 学习</h2>
    <video controls width="100%" v-for="video in content.videos" :key="video.id">
      <source :src="video.url" type="video/mp4">
    </video>
    <button @click="$router.push('/discussion/' + $route.params.id)">进入讨论区</button>
  </div>
</template>

<script>
import api from '@/api/api.js'
export default {
  data() {
    return { course: {}, content: { videos: [] } }
  },
  async mounted() {
    const res1 = await api.getCourseDetail(this.$route.params.id)
    this.course = res1.data
    const res2 = await api.getStudyContent(this.$route.params.id)
    this.content = res2.data
  }
}
</script>
