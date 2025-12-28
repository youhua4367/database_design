import { defineStore } from "pinia"
import { ref } from "vue"
import type { ApiResponse } from "@/types/api"

import {
    postPinService,
    postUnpinService,
    postAnnouncementService,
    postDeleteService,
    studentPostListByCourseService,
    studentPostDetailService,
    studentPostReplyListService,
    studentPostCreateService, studentPostReplyService
} from "@/api/teacher/comment.ts"
import type {Post, Reply} from "@/types/teacher/comment.ts";

export const usePostStore = defineStore("post", () => {
    
    const posts = ref<Post[]>([])
    
    const pinPost = async (postId: number) => {
        try {
            await postPinService(postId)
        } catch (error) {
            console.error("置顶帖子失败", error)
        }
    }
    
    const unpinPost = async (postId: number) => {
        try {
            await postUnpinService(postId)
        } catch (error) {
            console.error("取消置顶失败", error)
        }
    }
    
    const createAnnouncement = async (courseId: number, content: string) => {
        try {
            const res: ApiResponse = await postAnnouncementService(courseId, content)
            if (res.code === 200 && res.data) {
                posts.value.unshift(res.data)
            }
            return res
        } catch (error) {
            console.error("发布公告失败", error)
        }
    }
    
    const deletePost = async (postId: number) => {
        try {
            await postDeleteService(postId)
            posts.value = posts.value.filter(p => p.postId !== postId)
        } catch (error) {
            console.error("删除帖子失败", error)
        }
    }
    
    return {
        posts,
        pinPost,
        unpinPost,
        createAnnouncement,
        deletePost
    }
})

export const useCommentStore = defineStore("comment", () => {
    
    // 帖子列表
    const posts = ref<Post[]>([])
    
    // 当前帖子详情
    const currentPost = ref<Post | null>(null)
    
    // 当前帖子的回复列表
    const replies = ref<Reply[]>([])
    
    /**
     * 获取课程下所有帖子
     */
    const getPostsByCourse = async (courseId: number) => {
        try {
            const res: ApiResponse = await studentPostListByCourseService(courseId)
            if (res.code === 200) {
                posts.value = res.data || []
            }
        } catch (error) {
            console.error("获取帖子列表失败", error)
        }
    }
    
    /**
     * 获取帖子详情
     */
    const getPostDetail = async (postId: number) => {
        try {
            const res: ApiResponse = await studentPostDetailService(postId)
            if (res.code === 200) {
                currentPost.value = res.data
            }
        } catch (error) {
            console.error("获取帖子详情失败", error)
        }
    }
    
    /**
     * 获取帖子回复列表
     */
    const getRepliesByPost = async (postId: number) => {
        try {
            const res: ApiResponse = await studentPostReplyListService(postId)
            if (res.code === 200) {
                replies.value = res.data || []
            }
        } catch (error) {
            console.error("获取回复列表失败", error)
        }
    }
    
    /**
     * 发表新帖子
     */
    const createPost = async (courseId: number, content: string) => {
        try {
            const res: ApiResponse = await studentPostCreateService(courseId, content)
            if (res.code === 200 && res.data) {
                posts.value.unshift(res.data)
            }
            return res
        } catch (error) {
            console.error("发表帖子失败", error)
        }
    }
    
    /**
     * 回复帖子
     */
    const replyPost = async (postId: number, content: string) => {
        try {
            const res: ApiResponse = await studentPostReplyService(postId, content)
            if (res.code === 200 && res.data) {
                replies.value.push(res.data)
            }
            return res
        } catch (error) {
            console.error("回复失败", error)
        }
    }
    
    return {
        posts,
        currentPost,
        replies,
        getPostsByCourse,
        getPostDetail,
        getRepliesByPost,
        createPost,
        replyPost
    }
})