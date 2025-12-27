<template>
  <div class="container">
    <h2>我的课程</h2>
    <div class="course" v-for="c in myCourses" :key="c.id">
      <h3>{{ c.name }}</h3>
      <button @click="$router.push('/study/' + c.id)">进入学习</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return { myCourses: [] }
  },
  async mounted() {
    this.myCourses = [
      { id: 1, name: '数据库原理', progress: 50 },
      { id: 2, name: '操作系统', progress: 30 }
    ]
  }
}
</script>
