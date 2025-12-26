

      <nav :class="{ mobile: isMobile }">
        <button @click="currentSection='courses'">课程列表</button>
        <button @click="currentSection='mycourses'">我的课程</button>
        <button @click="currentSection='progress'">学习进度</button>
        <button @click="currentSection='discussion'">讨论区</button>
      </nav>
    </header>


</template>

<script>
import StudentHome from './views/student/StudentHome.vue'

export default {
  components: { StudentHome },
  data() {
    return {
      currentSection: 'courses',
      isMobile: false
    }
  },
  mounted() {
    this.checkScreen()
    window.addEventListener('resize', this.checkScreen)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreen)
  },
  methods: {
    checkScreen() {
      this.isMobile = window.innerWidth <= 768
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed; /* 固定在屏幕顶部 */
  top: 0;
  left: 0;
  width: 100%;
  background-color: #409eff;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000; /* 保证在最上层 */
  flex-wrap: wrap;
}

.header h1 {
  cursor: pointer;
  margin: 0;
}

nav {
  display: flex;
  gap: 10px;
}

nav button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #67c23a;
  color: white;
  cursor: pointer;
}

/* 手机端导航改为垂直堆叠 */
nav.mobile {
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
}
#app main, .student-home {
  padding-top: 70px; /* header 高度 + 间距 */
}
</style>

