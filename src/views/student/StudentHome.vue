<template>
  <div class="student-home">
    <!-- 课程列表 -->
    <section v-if="section==='courses'" class="section">
     <CourseList/>
    </section>

    <!-- 我的课程 -->
    <section v-if="section==='mycourses'" class="section">
      <MyCourse/>
    </section>

    <!-- 学习进度 -->
    <section v-if="section==='progress'" class="section">
      <ProgressPage/>
    </section>

    <!-- 讨论区 -->
    <section v-if="section==='discussion'" class="section">
      <DiscussionPage/>
    </section>
  </div>
</template>

<script>
import CourseList from "@/views/student/CourseList.vue";
import MyCourse from "@/views/student/MyCourse.vue";
import ProgressPage from "@/views/student/ProgressPage.vue";

import DiscussionPage from "@/views/student/DiscussionPage.vue";
export default {
  components: {CourseList,MyCourse,ProgressPage,DiscussionPage},
  props: ['section']
}
</script>

<style scoped>
.student-home {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.section {
  margin: 20px 0;
  background: white;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}



.course-info p {
  margin: 2px 0;
}



/* 手机端适配 */
@media (max-width: 768px) {
  .course {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn {
    margin-top: 5px;
    width: 100%;
  }
}
</style>
