<template>
  <div class="container">
    <h2>个人中心</h2>

    <!-- 个人信息显示 -->
    <section class="info-section">
      <h3>个人信息</h3>
      <form @submit.prevent="updateProfile">
        <div class="form-item">
          <label>姓名：</label>
          <input v-model="profile.name" type="text" required />
        </div>
        <div class="form-item">
          <label>邮箱：</label>
          <input v-model="profile.email" type="email" required />
        </div>
        <div class="form-item">
          <label>手机号：</label>
          <input v-model="profile.phone" type="text" />
        </div>
        <button type="submit">保存资料</button>
      </form>
    </section>

    <!-- 修改密码 -->
    <section class="password-section">
      <h3>修改密码</h3>
      <form @submit.prevent="changePassword">
        <div class="form-item">
          <label>旧密码：</label>
          <input v-model="password.old" type="password" required />
        </div>
        <div class="form-item">
          <label>新密码：</label>
          <input v-model="password.new" type="password" required />
        </div>
        <div class="form-item">
          <label>确认密码：</label>
          <input v-model="password.confirm" type="password" required />
        </div>
        <button type="submit">修改密码</button>
      </form>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 模拟用户数据
const profile = ref({
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '13800000000'
})

// 密码表单
const password = ref({
  old: '',
  new: '',
  confirm: ''
})

// 保存个人信息
function updateProfile() {
  alert(`已保存资料:\n姓名：${profile.value.name}\n邮箱：${profile.value.email}\n手机号：${profile.value.phone}`)
  // TODO: 调用后端 API 更新用户信息
}

// 修改密码
function changePassword() {
  if (password.value.new !== password.value.confirm) {
    alert('新密码与确认密码不一致！')
    return
  }
  alert('密码修改成功（模拟）')
  // 清空密码字段
  password.value.old = ''
  password.value.new = ''
  password.value.confirm = ''
  // TODO: 调用后端 API 修改密码
}
</script>

<style scoped>
.container {
  padding: 20px;
}

h2, h3 {
  margin-bottom: 10px;
}

section {
  margin-bottom: 30px;
  padding: 15px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}

.form-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.form-item label {
  width: 100px;
  font-weight: bold;
}

.form-item input {
  flex: 1;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 5px 15px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #66b1ff;
}
</style>
