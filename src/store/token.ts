import {defineStore} from "pinia";
import {ref} from "vue";


export const useTokenStore = defineStore("token", () => {
    // 定义token
    const token = ref("")
    
    // 定义修改 token 的方法
    const setToken = (newToken: string) => {
        token.value = newToken
    }
    
    // 删除token
    const removeToken = () => {
        token.value = ''
    }
    
    return {
        token,
        setToken,
        removeToken,
    }
},
    {
        persist: true,
    }
)