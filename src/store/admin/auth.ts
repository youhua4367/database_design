import { defineStore } from "pinia";
import { ref } from "vue";
import type { ApiResponse } from "@/types/api";
import type { TeacherAuth } from "@/types/admin/auth.ts";
import {getPendingTeacherAuthService, approveTeacherAuthService} from "@/api/admin/auth.ts";

export const useTeacherAuthStore = defineStore("teacherAuth", () => {
    
    const authList = ref<TeacherAuth[]>([]);
    
    /** 获取待审核认证列表 */
    const getPendingAuthList = async () => {
        try {
            const res: ApiResponse = await getPendingTeacherAuthService();
            if (res.code === 200) {
                authList.value = res.data;
            } else {
                authList.value = [];
            }
        } catch (error) {
            console.error("获取教师认证失败：", error);
        }
    };
    
    /** 审核认证 */
    const approveAuth = async (authId: number, status: number) => {
        try {
            const res: ApiResponse = await approveTeacherAuthService(authId, status);
            if (res.code === 200) {
                await getPendingAuthList();
            }
        } catch (error) {
            console.error("审核教师认证失败：", error);
        }
    };
    
    return {
        authList,
        getPendingAuthList,
        approveAuth
    };
});
