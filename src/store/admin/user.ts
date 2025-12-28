// @/store/admin/user.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/types/admin/user.ts";
import type { ApiResponse } from "@/types/api.ts";
import {getAllUsersService, getUsersByRoleService, updateUserStatusService, deleteUserService} from "@/api/admin/user.ts";

export const useUserStore = defineStore("user", () => {
    const users = ref<User[]>([]);
    const selectedUserId = ref<number | null>(null);
    
    /** 设置当前选中的用户 */
    const selectUser = (userId: number) => {
        selectedUserId.value = userId;
    };
    
    /** 查询所有用户 */
    const getAllUsers = async () => {
        try {
            const res: ApiResponse = await getAllUsersService();
            if (res.code === 200) {
                users.value = res.data;
            } else {
                users.value = [];
            }
        } catch (error) {
            console.error("获取用户列表失败：", error);
        }
    };
    
    /** 根据角色查询用户 */
    const getUsersByRole = async (role: number) => {
        try {
            const res: ApiResponse = await getUsersByRoleService(role);
            if (res.code === 200) {
                users.value = res.data;
            } else {
                users.value = [];
            }
        } catch (error) {
            console.error("根据角色获取用户失败：", error);
        }
    };
    
    /** 修改用户状态 */
    const updateUserStatus = async (userId: number, status: number) => {
        try {
            const res: ApiResponse = await updateUserStatusService(userId, status);
            if (res.code === 200) {
                await getAllUsers();
            }
        } catch (error) {
            console.error("修改用户状态失败：", error);
        }
    };
    
    /** 删除用户 */
    const deleteUser = async (userId: number) => {
        try {
            const res: ApiResponse = await deleteUserService(userId);
            if (res.code === 200) {
                await getAllUsers();
            }
        } catch (error) {
            console.error("删除用户失败：", error);
        }
    };
    
    return {
        users,
        selectedUserId,
        selectUser,
        getAllUsers,
        getUsersByRole,
        updateUserStatus,
        deleteUser
    };
});
