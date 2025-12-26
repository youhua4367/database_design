<template>
  <div class="discussion-page">
    <h2>课程讨论区</h2>

    <!-- 发布新帖 -->
    <el-card class="new-post-card">
      <el-input
          type="textarea"
          v-model="newPostContent"
          placeholder="发表新帖..."
          rows="3"
      />
      <div class="actions">
        <el-button type="primary" @click="createPost">发布</el-button>
      </div>
    </el-card>

    <!-- 帖子列表 -->
    <el-card
        v-for="post in posts"
        :key="post.post_id"
        class="post-card"
        @click="viewPost(post)"
    >
      <div class="post-header">
        <span class="author">{{ post.user_name }}</span>
        <span class="time">{{ post.create_time }}</span>
        <el-tag v-if="post.is_pinned" type="success">置顶</el-tag>
        <el-tag v-if="post.is_announced" type="warning">公告</el-tag>
      </div>
      <div class="post-content">{{ post.content }}</div>
      <div class="post-footer">
        <span>{{ post.reply_count }} 条回复</span>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Vue Router
const router = useRouter();

// 假数据
const posts = ref([
  { post_id: 1, user_name: "张三", content: "数据库作业问题求助", create_time: "2025-12-26 10:00", reply_count: 3, is_pinned: 1, is_announced: 0 },
  { post_id: 2, user_name: "李四", content: "操作系统课程分享资料", create_time: "2025-12-25 15:30", reply_count: 1, is_pinned: 0, is_announced: 1 },
]);

const newPostContent = ref("");

// 发布新帖
const createPost = () => {
  if (!newPostContent.value.trim()) return;
  posts.value.unshift({
    post_id: posts.value.length + 1,
    user_name: "当前学生",
    content: newPostContent.value,
    create_time: new Date().toISOString().slice(0, 16).replace("T", " "),
    reply_count: 0,
    is_pinned: 0,
    is_announced: 0,
  });
  newPostContent.value = "";
};

// 跳转到帖子详情页
const viewPost = (post) => {
  router.push({ name: "PostDetail", params: { postId: post.post_id } });
};
</script>

<style scoped>
.discussion-page {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.new-post-card, .post-card {
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.post-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: #606266;
}

.author {
  font-weight: bold;
  color: #409eff;
}

.time {
  font-size: 0.85rem;
  color: #909399;
}

.post-content {
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
  margin-bottom: 10px;
}

.post-footer {
  font-size: 0.85rem;
  color: #909399;
  text-align: right;
}

.actions {
  text-align: right;
  margin-top: 5px;
}
</style>


<style scoped>
.discussion-page {
  padding: 20px;
}

.new-post-card {
  margin-bottom: 20px;
  padding: 15px;
}

.post-card {
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.2s;
}
.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: #606266;
}

.post-content {
  margin-bottom: 10px;
  font-size: 1rem;
}

.post-footer {
  font-size: 0.85rem;
  color: #909399;
}
.actions {
  text-align: right;
  margin-top: 5px;
}
</style>
