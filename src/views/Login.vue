<script setup lang="ts">
import {reactive, ref} from 'vue'
import {ElMessage, type FormInstance, type FormRules} from "element-plus";
import {useRouter} from "vue-router";
import type {User} from "@/types/user.ts";
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
    { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
    { min: 6, message: '密码不能少于 6 位', trigger: ['blur', 'change'] }
  ]

}
 const goRegister = () => {
  router.push('/register')
 }
const onSubmit = async () => {
  // 假登录逻辑
  const fakeStudent = {
    userId: 1,
    username: "student01",
    role: 1,
    token: "fake-jwt-token-123456"
  }
  localStorage.setItem('studentLoggedIn', 'true')
  localStorage.setItem('studentToken', fakeStudent.token)
  localStorage.setItem('studentInfo', JSON.stringify(fakeStudent))
  ElMessage.success('登录成功（假数据）')
  router.push('/home/courses')
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
                    <el-button class="login-button" @click="goRegister">注册</el-button>
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