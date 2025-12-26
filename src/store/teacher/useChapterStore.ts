import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Chapter } from "@/types/teacher/chapter.ts";
import type { ApiResponse } from "@/types/api.ts";
import {
    chapterGetService,
    chapterCreateService,
    chapterDeleteService,
    chapterUpdateService
} from "@/api/teacher/chapter.ts";

export const useChapterStore = defineStore("chapter", () => {
    // 状态变量
    const chapters = ref<Chapter[]>([]);
    const selectedChapterId = ref<number | null>(null);
    
    // 被选中的章节
    const selectedChapter = computed(() => {
        return chapters.value.find(c => c.chapterId === selectedChapterId.value) || null;
    });
    
    const chaptersByOrder = computed(() => {
        return [...chapters.value].sort((a, b) => (a.order || 0) - (b.order || 0));
    });
    
    /**
     * 获取课程章节列表
     * @param courseId 课程 id
     */
    const getChapters = async (courseId: number) => {
        try {
            const res: ApiResponse = await chapterGetService(courseId);
            if (res.code === 200) {
                chapters.value = res.data;
            } else {
                chapters.value = [];
            }
        } catch (error) {
            console.error("获取章节失败：", error);
        }
    };
    
    /**
     * 新增章节
     * @param chapter 章节实体
     */
    const createChapter = async (chapter: Chapter) => {
        try {
            const res: ApiResponse = await chapterCreateService(chapter);
            if (res.code === 200) {
                await getChapters(chapter.courseId);
            }
        } catch (error) {
            console.error("新增章节失败：", error);
        }
    };
    
    /**
     * 删除章节
     * @param chapterId 章节 id
     * @param courseId 课程 id
     */
    const deleteChapter = async (chapterId: number, courseId: number) => {
        try {
            const res: ApiResponse = await chapterDeleteService(chapterId);
            if (res.code === 200) {
                await getChapters(courseId);
            }
        } catch (error) {
            console.error("删除章节失败：", error);
        }
    };
    
    /**
     * 更新章节
     * @param chapter 章节
     * @param courseId 课程 id
     */
    const updateChapter = async (chapter: Chapter, courseId: number) => {
        try {
            const res: ApiResponse = await chapterUpdateService(chapter);
            if (res.code === 200) {
                await getChapters(courseId);
            }
        } catch (error) {
            console.error("更新章节失败：", error);
        }
    };
    
    /** 设置当前选中的章节 */
    const selectChapter = (chapterId: number) => {
        selectedChapterId.value = chapterId;
    };
    
    return {
        chapters,
        selectedChapterId,
        selectedChapter,
        chaptersByOrder,
        getChapters,
        createChapter,
        deleteChapter,
        updateChapter,
        selectChapter,
    };
});
