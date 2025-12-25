<script setup lang="ts">
import { reactive } from 'vue'
import type {FormRules} from "element-plus";

// do not use same name with ref
const form = reactive({
    username: '',
    password: ''
})

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

const onSubmit = () => {
    console.log('submit!')
}
</script>

<template>
    <el-container class="wrapper">
        <el-card class="box-card">
            <el-form :model="form" label-width="auto" class="login" :rules="rules">
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