<script setup lang="ts">
import {reactive, ref} from 'vue'
import {ElMessage, type FormInstance, type FormRules} from "element-plus";
import {useRouter} from "vue-router";
import type {User, UserLogin} from "@/types/user.ts";
import {userLoginService} from "@/api/user.ts";
import {useTokenStore} from "@/store/token.ts";

const tokenStore = useTokenStore();
const formRef = ref<FormInstance>()
const form: User = reactive({
    username: '',
    password: ''
})
const router = useRouter()
// 校验规则
const rules: FormRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
        { min: 3, max: 12, message: '用户名长度在3到12个字符', trigger: ['blur','change'] }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码不能少于 6 位', trigger: 'blur' }
    ]
}

const onSubmit = async () => {
    try {
        await formRef.value?.validate()
        const res = await userLoginService(form); // form里有username/password
        if (res.code === 200) {
            const loginData: UserLogin = {
                username: res.data.username,
                role: res.data.role,
                token: res.token
            }
            tokenStore.setToken(loginData);
            ElMessage.success("登录成功！");
            // 根据角色跳转首页
            switch (loginData.role) {
                case 1:
                    await router.push("/student/home");
                    break;
                case 2:
                    await router.push("/teacher/home");
                    break;
                case 3:
                    await router.push("/admin/home");
                    break;
            }
        } else {
            ElMessage.error(res.message || "登录失败");
        }
    } catch (err) {
        ElMessage.error("用户名或密码错误");
    }
}
</script>

<template>
    <el-container class="wrapper">
        <el-card class="box-card">
            <el-form :model="form" label-width="auto" class="login" :rules="rules" ref="formRef">
                <el-form-item label="账户" prop="username" class="login-item">
                    <el-input v-model="form.username" type="text" autocomplete="off" class="login-input" />
                </el-form-item>
                <el-form-item label="密码" prop="password" class="login-item">
                    <el-input v-model="form.password" type="password" show-password class="login-input" />
                </el-form-item>
                <el-form-item class="login-item">
                    <el-button type="primary" @click="onSubmit" class="login-button" style="margin-top: 3vh">登录</el-button>
                </el-form-item>
                <el-form-item class="login-item">
                    <el-button class="login-button">注册</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-container>
</template>

<style scoped lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-image: url("@/assets/image/login.png");
    background-repeat: no-repeat;
    background-size: cover;
    .box-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 30vw;
        height: 38vh;

        .login {
            width: 20vw;
            margin-top: 5vh;
            overflow-y: hidden;
            .login-button {
                width: 20vw;
            }
        }
    }
}

</style>