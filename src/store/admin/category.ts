// @/store/admin/category.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Category } from "@/types/admin/category.ts";
import type { ApiResponse } from "@/types/api.ts";
import {categoryListService, categoryCreateService, categoryUpdateService, categoryDeleteService} from "@/api/admin/category.ts";


export const useCategoryStore = defineStore("category", () => {
    // 分类列表
    const categories = ref<Category[]>([]);
    const selectedCategoryId = ref<number | null>(null);
    
    // 被选中的分类
    const selectedCategory = computed(() => {
        return categories.value.find(c => c.categoryId === selectedCategoryId.value) || null;
    });
    
    /**
     * 获取所有分类列表
     */
    const getCategories = async () => {
        try {
            const res: ApiResponse = await categoryListService();
            if (res.code === 200) {
                categories.value = res.data;
            } else {
                categories.value = [];
            }
        } catch (error) {
            console.error("获取分类失败：", error);
        }
    };
    
    /**
     * 创建分类
     * @param categoryName 分类名称
     */
    const createCategory = async (categoryName: string) => {
        try {
            const res: ApiResponse = await categoryCreateService(categoryName);
            if (res.code === 200) {
                await getCategories();
            }
        } catch (error) {
            console.error("创建分类失败：", error);
        }
    };
    
    /**
     * 更新分类
     * @param categoryId 分类ID
     * @param categoryName 新名称
     */
    const updateCategory = async (categoryId: number, categoryName: string) => {
        try {
            const res: ApiResponse = await categoryUpdateService(categoryId, categoryName);
            if (res.code === 200) {
                await getCategories();
            }
        } catch (error) {
            console.error("更新分类失败：", error);
        }
    };
    
    /**
     * 删除分类
     * @param categoryId 分类ID
     */
    const deleteCategory = async (categoryId: number) => {
        try {
            const res: ApiResponse = await categoryDeleteService(categoryId);
            if (res.code === 200) {
                await getCategories();
            }
        } catch (error) {
            console.error("删除分类失败：", error);
        }
    };
    
    /** 设置当前选中的分类 */
    const selectCategory = (categoryId: number) => {
        selectedCategoryId.value = categoryId;
    };
    
    return {
        categories,
        selectedCategoryId,
        selectedCategory,
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        selectCategory,
    };
});
