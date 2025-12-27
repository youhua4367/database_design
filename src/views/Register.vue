<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import type { User } from '@/types/user.ts'
import { userRegisterService } from '@/api/user.ts'

const formRef = ref<FormInstance>()
const router = useRouter()

// 注册表单数据
const form: User & { role: number; material?: string; email?: string } = reactive({
username: '',
password: '',
email: '',
role: 1,       // 默认学生
material: ''   // 教师资质证明
})

// 表单验证规则

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
    { min: 3, max: 12, message: '用户名长度在3到12个字符', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
    { min: 6, message: '密码不能少于6位', trigger: ['blur', 'change'] }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: ['blur','change'] },
    { type: 'email', message: '邮箱格式不正确', trigger: ['blur','change'] }
  ],
  material: [
    {
      validator: (rule, value) => {
        return new Promise<void>((resolve, reject) => {
          if (form.role === 2 && (!value || value.trim() === '')) {
            reject(new Error('教师注册必须提交资质证明'))
          } else {
            resolve()
          }
        })
      },
      trigger: ['blur','change']
    }
  ]
}


// 提交注册
const onSubmit = async () => {
try {
// 校验表单
await formRef.value?.validate()

const payload: any = { ...form }
if (form.role === 1) delete payload.material // 学生无需提交资质

const res = await userRegisterService(payload)
if (res.code === 200) {
ElMessage.success(res.message || '注册成功！')
router.push('/login')
} else {
ElMessage.error(res.message || '注册失败！')
}
} catch (err) {
ElMessage.error('请完善表单信息！')
}
}
</script>

<template>
  <el-container class="wrapper">
    <el-card class="box-card">
      <el-form
          :model="form"
          :rules="rules"
          ref="formRef"
          label-width="auto"
          class="register-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <el-radio-group v-model="form.role">
            <el-radio :label="1">学生</el-radio>
            <el-radio :label="2">教师</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="资质证明" v-if="form.role === 2" prop="material">
          <el-input v-model="form.material" placeholder="如学历证书、工作经验等" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 100%">
            注册
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="text" @click="router.push('/login')" style="width: 100%">
            已有账号？去登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/image/login.png");
  background-size: cover;
  background-repeat: no-repeat;

  .box-card {
    width: 30vw;
    padding: 20px;

    .register-form {
      .el-form-item {
        margin-bottom: 15px;
      }
      .el-button {
        margin-top: 10px;
      }
    }
  }
}
</style>
