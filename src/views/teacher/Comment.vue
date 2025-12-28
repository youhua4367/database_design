<script setup lang="ts">
import avatar from "@/assets/image/login.png"
import { useRoute } from "vue-router"
import { computed, onMounted, ref } from "vue"
import { useCourseStore } from "@/store/teacher/course.ts"
import { useCommentStore } from "@/store/teacher/comment.ts"
import { ElMessage, ElEmpty } from "element-plus"

/// 头像和接受课程 id 参数
const image = avatar
const route = useRoute()
const courseId = computed<number>(() => Number(route.params.id))

const courseStore = useCourseStore()
const commentStore = useCommentStore()

// 发帖内容
const postContent = ref("")
// 回复内容
const replyContent = ref("")
// 当前回复的帖子 ID
const replyPostId = ref<number | null>(null)
// 加载状态
const loading = ref(false)

// 发帖
const createPost = async () => {
    if (!postContent.value.trim()) {
        ElMessage.warning("帖子内容不能为空")
        return
    }
    loading.value = true
    try {
        await commentStore.createPost(courseId.value, postContent.value)
        ElMessage.success("发帖成功")
        postContent.value = ""
        // 重新获取帖子列表
        await commentStore.getPostsByCourse(courseId.value)
    } catch (error) {
        ElMessage.error("发帖失败，请重试")
        console.error("发帖失败：", error)
    }
}

// 查看/收起帖子详情 & 回复
const togglePostDetail = async (postId: number) => {
    // 点击已展开的帖子，收起回复区
    if (replyPostId.value === postId) {
        replyPostId.value = null
        return
    }
    // 展开新帖子的回复区
    loading.value = true
    try {
        replyPostId.value = postId
        await commentStore.getPostDetail(postId)
        await commentStore.getRepliesByPost(postId)
    } catch (error) {
        ElMessage.error("加载回复失败，请重试")
        console.error("加载回复失败：", error)
    } finally {
        loading.value = false
    }
}

// 回复帖子
const replyPost = async () => {
    if (!replyContent.value.trim() || replyPostId.value === null) {
        ElMessage.warning("回复内容不能为空")
        return
    }
    loading.value = true
    try {
        await commentStore.replyPost(replyPostId.value, replyContent.value)
        ElMessage.success("回复成功")
        replyContent.value = ""
        // 重新获取回复列表
        await commentStore.getRepliesByPost(replyPostId.value)
    } catch (error) {
        ElMessage.error("回复失败，请重试")
        console.error("回复失败：", error)
    } finally {
        loading.value = false
    }
}

// 获取课程 & 评论
onMounted(async () => {
    loading.value = true
    try {
        await courseStore.getCourses()
        courseStore.getSelectedCourse(courseId.value)
        await commentStore.getPostsByCourse(courseId.value)
    } catch (error) {
        ElMessage.error("加载数据失败，请刷新页面")
        console.error("加载数据失败：", error)
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <el-container class="wrapper">
        <!-- 课程信息 -->
        <el-header class="course-header">
            <el-card class="course-card" shadow="hover">
                <img :src="image" alt="" class="course-img">
                <div class="course-name">课程名称：{{ courseStore.selectedCourse?.courseName }}</div>
                <div class="course-desc">课程描述：{{ courseStore.selectedCourse?.description }}</div>
            </el-card>
        </el-header>

        <!-- 评论区主体 -->
        <el-main class="comment-main">
            <!-- 发帖区域 -->
            <el-card class="post-editor-card" shadow="hover">
                <div class="editor-title">发布评论</div>
                <el-input
                    v-model="postContent"
                    type="textarea"
                    placeholder="分享你的学习心得、问题或建议..."
                    :rows="4"
                    class="post-input"
                    :disabled="loading"
                />
                <div class="post-btn-wrap">
                    <el-button
                        type="primary"
                        @click="createPost"
                        :loading="loading"
                    >
                        发表帖子
                    </el-button>
                </div>
            </el-card>

            <!-- 帖子列表区域 -->
            <div class="posts-list">
                <div class="list-title">
                    <span>评论列表</span>
                    <el-tag size="small" type="info">{{ commentStore.posts.length }} 条评论</el-tag>
                </div>
                <ElEmpty
                    v-if="commentStore.posts.length === 0"
                    description="暂无评论，快来发表第一条评论吧～"
                    class="empty-posts"
                />
                <!-- 帖子列表 -->
                <el-card
                    v-else
                    v-for="post in commentStore.posts"
                    :key="post.postId"
                    class="post-card"
                    shadow="hover"
                >
                    <!-- 帖子头部 -->
                    <div class="post-header">
                        <img :src="image" alt="用户头像" class="user-avatar" />
                        <div class="post-info">
                            <div class="post-content">{{ post.content }}</div>
                            <div class="post-meta">
                                <span class="post-time">{{ post.createTime }}</span>
                                <el-button
                                    type="text"
                                    size="small"
                                    @click.stop="togglePostDetail(post.postId)"
                                    class="reply-btn"
                                >
                                    {{ replyPostId === post.postId ? "收起回复" : "查看回复" }}
                                </el-button>
                            </div>
                        </div>
                    </div>

                    <!-- 回复区（仅当前选中的帖子显示） -->
                    <div v-if="replyPostId === post.postId" class="reply-section">
                        <el-divider content-position="left">回复区</el-divider>

                        <!-- 回复列表 -->
                        <div class="replies-list">
                            <ElEmpty
                                v-if="commentStore.replies.length === 0 && !loading"
                                description="暂无回复，快来抢沙发～"
                                class="empty-replies"
                            />
                            <div
                                v-for="reply in commentStore.replies"
                                :key="reply.replyId"
                                class="reply-item"
                            >
                                <img :src="image" alt="回复者头像" class="user-avatar" />
                                <div class="reply-info">
                                    <div class="reply-content">{{ reply.content }}</div>
                                    <div class="reply-time">{{ reply.createTime }}</div>
                                </div>
                            </div>
                        </div>
                        <!-- 回复输入框 -->
                        <div class="reply-editor">
                            <el-input
                                v-model="replyContent"
                                type="textarea"
                                placeholder="写下你的回复..."
                                :rows="2"
                                :disabled="loading"
                            />
                            <el-button
                                type="primary"
                                size="small"
                                @click="replyPost"
                                :loading="loading"
                                class="submit-reply-btn"
                            >
                                提交回复
                            </el-button>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-main>
    </el-container>
</template>

<style scoped lang="scss">
.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .course-header {
        height: 30%;
        .course-card {
            width: 100%;
            border-radius: 12px;
            text-align: center;
            .course-img {
                width: 150px;
                height: 150px;
                border-radius: 8px;
                margin: 0 auto 16px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            }
            .course-name {
                color: #1f2937;
            }
            .course-desc {
                color: #6b7280;
                line-height: 1.6;
            }
        }
    }

    .comment-main {
        .post-editor-card {
            border-radius: 12px;
            margin-bottom: 2vh;
            .editor-title {
                font-size: 1vw;
                color: #1f2937;
                margin-bottom: 1vh;
            }
            .post-input {
                border-radius: 8px;
                margin-bottom: 1vh;
            }
            .post-btn-wrap {
                display: flex;
                justify-content: flex-end;
            }
        }
        .posts-list {
            .list-title {
                display: flex;
                align-items: center;
                gap: 1vw;
                margin-bottom: 1vw;

                span {
                    font-size: 16px;
                    font-weight: 600;
                    color: #1f2937;
                }
            }
            .post-card {
                border-radius: 12px;
                margin-bottom: 1vh;
                overflow: hidden;
                .post-header {
                    display: flex;
                    gap: 1vw;
                    padding: 1vw 2vh;
                    border-bottom: 1px solid #f0f0f0;
                    .user-avatar {
                        width: 48px;
                        height: 48px;
                        border-radius: 50%;
                    }
                    .post-info {
                        flex: 1;
                        .post-content {
                            font-size: 1vw;
                            color: #1f2937;
                        }
                        .post-meta {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .post-time {
                                font-size: 0.8vw;
                                color: #9ca3af;
                            }
                            .reply-btn {
                                color: #3b82f6;
                                padding: 0;
                                &:hover {
                                    color: #2563eb;
                                }
                            }
                        }
                    }
                }
                .reply-section {
                    .empty-replies {
                        padding: 20px 0;
                    }
                    .replies-list {
                        margin-bottom: 1vh;
                        .reply-item {
                            display: flex;
                            gap: 1vw;
                            margin-bottom: 1vh;
                            .user-avatar {
                                width: 36px;
                                height: 36px;
                                border-radius: 50%;
                            }
                            .reply-info {
                                flex: 1;
                                background-color: #f9fafb;
                                padding: 1vw;
                                border-radius: 8px;
                                .reply-content {
                                    font-size: 0.8vw;
                                    color: #1f2937;
                                    margin-bottom: 1vh;
                                }
                                .reply-time {
                                    font-size: 0.7vw;
                                    color: #9ca3af;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>