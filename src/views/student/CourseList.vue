<template>
  <div class="container">

    <!-- 搜索 & 分类筛选 -->
    <div class="filter-bar">
      <input type="text" v-model="searchText" placeholder="搜索课程" />
      <select v-model="selectedCategory">
        <option value="">全部分类</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <!-- 课程列表 -->
    <div class="course" v-for="c in filteredCourses" :key="c.id">
      <div class="course-info">
        <h3>{{ c.name }}</h3>
        <p>教师：{{ c.teacher }}</p>
        <p>分类：{{ c.category }}</p>
        <p>价格：￥{{ c.price }}</p>
      </div>
      <button @click="goCourse(c)">
        {{ enrolledCourseIds.includes(c.id) ? '查看课程' : '报名 / 购买' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchText = ref('')
const selectedCategory = ref('')

// 假数据：课程列表
const courses = ref([
  { id: 1, name: '数据库原理', teacher: '张老师', price: 99, category: '计算机' },
  { id: 2, name: '操作系统', teacher: '李老师', price: 89, category: '计算机' },
  { id: 3, name: '心理学入门', teacher: '王老师', price: 59, category: '文科' },
  { id: 4, name: '哲学基础', teacher: '刘老师', price: 49, category: '文科' }
])

// 假数据：学生已报名课程ID
const enrolledCourseIds = ref([1, 2,3])

// 自动生成分类列表
const categories = Array.from(new Set(courses.value.map(c => c.category)))

// 筛选后的课程列表
const filteredCourses = computed(() => {
  return courses.value.filter(course => {
    const matchName = course.name.toLowerCase().includes(searchText.value.toLowerCase())
    const matchCategory = selectedCategory.value === '' || course.category === selectedCategory.value
    return matchName && matchCategory
  })
})

// 点击课程按钮
function goCourse(course: typeof courses.value[0]) {
  if (enrolledCourseIds.value.includes(course.id)) {
    // 已报名 → 进入章节列表
    router.push(`courses/${course.id}`)
  } else {
    // 未报名 → 提示报名
    router.push(`courses/${course.id}/enroll`)
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}
.filter-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input {
  flex: 1;
  padding: 5px 10px;
}
select {
  padding: 5px 10px;
}
.course {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
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
