<template>
  <div class="post-detail-page">
    <el-card class="post-card">
      <div class="post-header">
        <span class="author">{{ post.user_name }}</span>
        <span class="time">{{ post.create_time }}</span>
        <el-tag v-if="post.is_pinned" type="success">置顶</el-tag>
        <el-tag v-if="post.is_announced" type="warning">公告</el-tag>
      </div>
      <div class="post-content">{{ post.content }}</div>
    </el-card>

    <h3>回复列表</h3>
    <el-card v-for="reply in replies" :key="reply.reply_id" class="reply-card">
      <div class="reply-header">
        <span class="author">{{ reply.user_name }}</span>
        <span class="time">{{ reply.create_time }}</span>
      </div>
      <div class="reply-content">{{ reply.content }}</div>
    </el-card>

    <el-card class="reply-box">
      <el-input
          type="textarea"
          v-model="newReplyContent"
          placeholder="回复内容..."
          rows="2"
      />
      <div class="actions">
        <el-button type="primary" @click="submitReply">回复</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 假数据
const post = ref([
  { post_id: 1, user_name: "张三", content: "数据库作业问题求助", create_time: "2025-12-26 10:00", reply_count: 3, is_pinned: 1, is_announced: 0 },
  { post_id: 2, user_name: "李四", content: "操作系统课程分享资料", create_time: "2025-12-25 15:30", reply_count: 1, is_pinned: 0, is_announced: 1 },
]);

const replies = ref([
  { reply_id: 1, user_name: "李四", content: "你可以参考教材第5章", create_time: "2025-12-26 10:15" },
  { reply_id: 2, user_name: "王五", content: "也可以看网上视频", create_time: "2025-12-26 10:30" },
]);

const newReplyContent = ref("");

const submitReply = () => {
  if (!newReplyContent.value) return;
  replies.value.push({
    reply_id: replies.value.length + 1,
    user_name: "当前学生",
    content: newReplyContent.value,
    create_time: new Date().toISOString().slice(0,16).replace("T"," "),
  });
  newReplyContent.value = "";
};
</script>

<style scoped>
.post-detail-page {
  padding: 20px;
}

.post-card, .reply-card, .reply-box {
  margin-bottom: 15px;
  padding: 15px;
}

.post-header, .reply-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #606266;
}

.post-content, .reply-content {
  margin-top: 10px;
}

.actions {
  text-align: right;
  margin-top: 5px;
}
</style>
