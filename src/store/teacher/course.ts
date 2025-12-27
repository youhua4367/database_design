import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {Course, CoursePost, CourseStudent} from "@/types/teacher/course.ts";
import type {ApiResponse} from "@/types/api.ts";
import {
    courseCreateService,
    courseGetService,
    courseGetStudentService,
    courseUpdateService
} from "@/api/teacher/course.ts";

export const useCourseStore = defineStore("course", () => {
    // 状态对象
    const courses = ref<Course[]>([]);
    const selectedCourseId = ref<number>(0);
    const category = ref<string[]>([]);
    const courseStudent = ref<CourseStudent[]>([])
    
    const selectedCourse = ref<Course>()
    // 根据类别分出来的课程
    const coursesByCategory = computed(() => {
        const map: Record<string, Course[]> = {};
        for (const course of courses.value) {
            const category = course.categoryName || "未分类";
            if (!map[category]) {
                map[category] = [];
            }
            map[category].push(course);
        }
        return map;
    });
    
    // 方法
    /**
     * 课程列表
     */
    const getCourses = async () => {
        const res: ApiResponse = await courseGetService();
        try {
            if (res.code === 200) {
                courses.value = res.data;
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    /**
     * 创建课程
     * @param course 课程实体
     */
    const createCourse = async (course: CoursePost) => {
        
        try {
            const res: ApiResponse = await courseCreateService(course);
            if (res.code === 200) {
                await getCourses();
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    /**
     * 更新课程
     * @param courseId id
     * @param course 课程
     */
    const updateCourse = async (courseId: number, course: CoursePost) => {
        try {
            const res: ApiResponse = await courseUpdateService(courseId, course);
            if (res.code === 200) {
                await getCourses();
            }
            return res;
        } catch (error) {
            console.error(error);
        }
    };
    
    /**
     * 获取课程的所有分类
     */
    const getCategory = () => {
        category.value = []; // 先清空
        for (const course of courses.value) {
            if (!category.value.includes(course.categoryName)) {
                category.value.push(course.categoryName);
            }
        }
    }
    
    /**
     * 获取课程学生
     * @param courseId
     */
    const getStudents = async (courseId: number) => {
        try {
            const res: ApiResponse = await courseGetStudentService(courseId);
            if (res.code === 200) {
                courseStudent.value = res.data;
                selectedCourseId.value = courseId;
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    /**
     * 获取选择的课程
     * @param courseId
     */
    const getSelectedCourse = (courseId: number) => {
        selectedCourse.value = courses.value.find(course => course.courseId === courseId);
        selectedCourseId.value = courseId;
    }
    return {
        courses,
        selectedCourseId,
        category,
        coursesByCategory,
        courseStudent,
        selectedCourse,
        getCourses,
        createCourse,
        updateCourse,
        getCategory,
        getStudents,
        getSelectedCourse,
    };
});