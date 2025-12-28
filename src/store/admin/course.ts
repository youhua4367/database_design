import { defineStore } from "pinia";
import { ref } from "vue";
import type { ApiResponse } from "@/types/api";
import type { Course } from "@/types/admin/course";
import { getPendingCoursesService, approveCourseService, deleteCourseService } from "@/api/admin/course.ts";

export const useCourseStore = defineStore("course", () => {
    
    const courses = ref<Course[]>([]);
    
    /** 获取待审核课程列表 */
    const getPendingCourses = async () => {
        try {
            const res: ApiResponse = await getPendingCoursesService();
            if (res.code === 200) {
                courses.value = res.data;
            } else {
                courses.value = [];
            }
        } catch (error) {
            console.error("获取待审核课程失败：", error);
        }
    };
    
    /** 审核课程 */
    const approveCourse = async (courseId: number, status: number) => {
        try {
            const res: ApiResponse = await approveCourseService(courseId, status);
            if (res.code === 200) {
                await getPendingCourses();
            }
        } catch (error) {
            console.error("审核课程失败：", error);
        }
    };
    
    /** 删除课程 */
    const deleteCourse = async (courseId: number) => {
        try {
            const res: ApiResponse = await deleteCourseService(courseId);
            if (res.code === 200) {
                await getPendingCourses();
            }
        } catch (error) {
            console.error("删除课程失败：", error);
        }
    };
    
    return {
        courses,
        getPendingCourses,
        approveCourse,
        deleteCourse
    };
});
