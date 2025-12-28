<template>
  <div class="container">
    <h2>课程列表</h2>

    <div class="filter-bar">
      <input type="text" placeholder="搜索课程" v-model="searchText" />
      <select v-model="selectedCategory">
        <option value="">全部分类</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="course" v-for="c in filteredCourses" :key="c.id">
      <div class="course-info">
        <h3>{{ c.name }}</h3>
        <p>教师：{{ c.teacher }}</p>
        <p>分类：{{ c.category }}</p>
        <p>价格：￥{{ c.price }}</p>
      </div>
      <button @click="goCourse(c)">
        查看课程
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      selectedCategory: '',
      courses: [],
      categories: [],
      enrolledCourseIds: [1] // 假设学生只报名了课程id=1
    }
  },
  computed: {
    filteredCourses() {
      return this.courses.filter(course => {
        const matchName = course.name.toLowerCase().includes(this.searchText.toLowerCase())
        const matchCategory = this.selectedCategory === '' || course.category === this.selectedCategory
        return matchName && matchCategory
      })
    }
  },
  methods: {
    goCourse(course) {
      // 验证是否报名
      if (!this.enrolledCourseIds.includes(course.id)) {
        alert('你未报名该课程，无法查看章节内容！')
        return
      }
      this.$router.push(`/course/${course.id}`)
    }
  },
  mounted() {
    this.courses = [
      { id: 1, name: '数据库原理', teacher: '张老师', price: 99, category: '计算机' },
      { id: 2, name: '操作系统', teacher: '李老师', price: 89, category: '计算机' },
      { id: 3, name: '心理学入门', teacher: '王老师', price: 59, category: '文科' }
    ]
    this.categories = [...new Set(this.courses.map(c => c.category))]
  }
}
</script>
