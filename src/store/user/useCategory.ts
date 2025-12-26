import {defineStore} from "pinia";
import {ref} from "vue";

import type {Category} from "@/types/user/category.ts";
import type {ApiResponse} from "@/types/api.ts";
import {categoryGetService} from "@/api/user/category.ts";

export const useCategoryStore = defineStore("category", () => {
    
    const categoryList = ref<Category[]>([])
    
    const getCategoryList = async () => {
        try {
            const res: ApiResponse = await categoryGetService();
            if (res.code === 200) {
                categoryList.value = res.data;
            }
        } catch (error) {
            console.error(error);
        }
    }
    return {
        categoryList,
        getCategoryList,
    };
});