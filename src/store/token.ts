import {defineStore} from "pinia";
import {ref} from "vue";
import type {UserLogin} from "@/types/user.ts";


export const useTokenStore = defineStore("token", () => {
    const token = ref("")
    const role = ref(0)  // 1=学生, 2=教师, 3=管理员
    const username = ref("")
    
    const setToken = (loginData: UserLogin) => {
        token.value = loginData.token
        role.value = loginData.role
        username.value = loginData.username
    }
    
    const removeToken = () => {
        token.value = ""
        role.value = 0
        username.value = ""
    }
    
    return {
        token,
        role,
        username,
        setToken,
        removeToken
    }
}, {
    persist: true
})
