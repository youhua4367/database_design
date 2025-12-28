export interface Post {
    postId: number
    courseId: number
    userId: number
    content: string
    createTime: string
    isPinned: number
    isDeleted: number
    roleId: number
    isAnnounced: number
}

export interface Reply {
    replyId: number
    postId: number
    userId: number
    content: string
    createTime: string
}
