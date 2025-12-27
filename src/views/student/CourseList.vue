<template>
  <div class="container">

    <!-- 搜索 & 分类筛选 -->
    <div class="filter-bar">
      <input type="text" v-model="searchText" placeholder="搜索课程" @keyup.enter="fetchCourses" />
      <select v-model="selectedCategory" @change="fetchCourses">
        <option value="">全部分类</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <button @click="fetchCourses">搜索</button>
    </div>

    <!-- 课程列表 -->
    <div class="course" v-for="c in courses" :key="c.id">
      <div class="course-info">
        <h3>{{ c.name }}</h3>
        <p>教师：{{ c.teacher.name || c.teacher }}</p>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const searchText = ref('')
const selectedCategory = ref('')
const courses = ref<Array<any>>([])
const enrolledCourseIds = ref<number[]>([])
const categories = ref<Array<string>>([])

// -------------------- 后端接口 --------------------
// 后端 base URL
const API_BASE = 'http://localhost:8080/StudentCourseController'

// 获取课程列表
async function fetchCourses(page = 1, pageSize = 20) {
  try {
    let url = `${API_BASE}/list?page=${page}&pageSize=${pageSize}`

    if (searchText.value) {
      // 根据关键词搜索
      url = `${API_BASE}/search?keyword=${encodeURIComponent(searchText.value)}&page=${page}&pageSize=${pageSize}`
    } else if (selectedCategory.value) {
      // 根据分类
      url = `${API_BASE}/category/${encodeURIComponent(selectedCategory.value)}?page=${page}&pageSize=${pageSize}`
    }

    const res = await axios.get(url, {
      withCredentials: true // 如果后端有 session 或 token 认证
    })

    if (res.data.code === 200) {
      courses.value = res.data.data.records || res.data.data // 兼容分页数据结构
      // 更新分类
      categories.value = Array.from(new Set(courses.value.map(c => c.category)))
    } else {
      alert(res.data.msg || '获取课程失败')
    }
  } catch (err) {
    console.error(err)
    alert('获取课程失败')
  }
}

// 获取已报名课程
async function fetchEnrolledCourses() {
  try {
    const res = await axios.get(`${API_BASE}/my-courses`, { withCredentials: true })
    if (res.data.code === 200) {
      enrolledCourseIds.value = res.data.data.map((e: any) => e.courseId)
    } else {
      enrolledCourseIds.value = []
    }
  } catch (err) {
    console.error(err)
  }
}

// 点击课程按钮
async function goCourse(course: any) {
  if (enrolledCourseIds.value.includes(course.id)) {
    // 已报名 → 进入课程详情页
    router.push(`/courses/${course.id}`)
  } else {
    // 未报名 → 调用报名接口
    try {
      const res = await axios.post(`${API_BASE}/enroll?courseId=${course.id}`, null, { withCredentials: true })
      if (res.data.code === 200) {
        alert('报名成功！')
        enrolledCourseIds.value.push(course.id)
        router.push(`/courses/${course.id}`)
      } else {
        alert(res.data.msg || '报名失败')
      }
    } catch (err) {
      console.error(err)
      alert('报名失败')
    }
  }
}

// 页面初始化
onMounted(() => {
  fetchCourses()
  fetchEnrolledCourses()
})
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
