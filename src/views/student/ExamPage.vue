<template>
  <div class="exam-page">
    <h2>课程考试列表</h2>
    <el-table :data="examList" style="width: 100%">
      <el-table-column prop="title" label="考试名称" />
      <el-table-column prop="start_time" label="开始时间" />
      <el-table-column prop="end_time" label="结束时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="viewExam(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="selectedExam">
      <h3>考试详情: {{ selectedExam.title }}</h3>
      <p>说明: {{ selectedExam.description }}</p>
      <p>时间: {{ selectedExam.start_time }} ~ {{ selectedExam.end_time }}</p>
      <p>总分: {{ selectedExam.total_score }}</p>

      <h4>提交答案</h4>
      <el-input type="textarea" v-model="examAnswer" placeholder="请输入答案" />
      <el-button type="success" @click="submitExam">提交考试</el-button>
    </div>

    <h2>我的考试成绩</h2>
    <el-table :data="myExamScores" style="width: 100%">
      <el-table-column prop="exam_title" label="考试名称" />
      <el-table-column prop="score" label="分数" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="feedback" label="教师反馈" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const examList = ref([]);
const selectedExam = ref(null);
const examAnswer = ref("");
const myExamScores = ref([]);

// 加载课程考试列表
const loadExamList = async () => {
  const res = await axios.get("/api/exams/courseExams", { params: { course_id: 1 } });
  examList.value = res.data;
};

// 查看考试详情
const viewExam = (exam) => {
  selectedExam.value = exam;
};

// 提交考试答案
const submitExam = async () => {
  try {
    await axios.post("/api/exams/submit", {
      exam_id: selectedExam.value.exam_id,
      student_id: 1,
      answers: examAnswer.value
    });
    alert("考试提交成功！");
    loadMyExamScores();
  } catch (err) {
    console.error(err);
    alert("提交失败！");
  }
};

// 查看我的考试成绩
const loadMyExamScores = async () => {
  const res = await axios.get("/api/exams/myScores", { params: { student_id: 1 } });
  myExamScores.value = res.data;
};

onMounted(() => {
  loadExamList();
  loadMyExamScores();
});
</script>

<style scoped>
.exam-page {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}
</style>
