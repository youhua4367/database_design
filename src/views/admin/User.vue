<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ElMessage, ElMessageBox, ElSwitch } from 'element-plus';
import { useUserStore } from '@/store/admin/user.ts';

const userStore = useUserStore();

// 搜索相关
const searchKeyword = ref('');
// 0=全部，1=学生，2=老师，3=管理员
const roleFilter = ref<number>(0);

// 角色映射（数字转文字）
const roleMap: Record<number, string> = {
    0: '全部',
    1: '学生',
    2: '老师',
    3: '管理员'
};

// 筛选后的用户列表
const filteredUsers = computed(() => {
    let result = userStore.users;

    if (roleFilter.value !== 0) {
        console.log(typeof roleFilter.value);
        console.log(roleFilter.value);
        result = result.filter(user => user.role === Number(roleFilter.value));
    }

    if (searchKeyword.value.trim()) {
        result = result.filter(user =>
            user.username.toLowerCase().includes(searchKeyword.value.trim().toLowerCase())
        );
    }

    return result;
});

// 编辑弹窗
const editDialogVisible = ref(false);
const editUserId = ref<number | null>(null);
const editUsername = ref('');
const editEmail = ref('');
const editRole = ref<number>(1);

// 获取用户列表
const loadUsers = async () => {
    try {
        await userStore.getAllUsers();
    } catch (error) {
        ElMessage.error('加载用户列表失败');
        console.error(error);
    }
};

// 打开编辑弹窗（仅展示信息）
const openEditDialog = (userId: number, username: string, email: string, role: number) => {
    editUserId.value = userId;
    editUsername.value = username;
    editEmail.value = email;
    editRole.value = role;
    editDialogVisible.value = true;
};

// 删除用户
const handleDeleteUser = async (userId: number) => {
    try {
        await ElMessageBox.confirm(
            '确定要删除该用户吗？',
            '删除确认',
            { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
        );
        await userStore.deleteUser(userId);
        ElMessage.success('删除成功');
        await loadUsers();
    } catch (error: any) {
        if (error !== 'cancel' && error !== 'close') {
            ElMessage.error('删除失败');
        }
    }
};

// 修改用户状态
const handleChangeStatus = async (userId: number, status: number) => {
    try {
        await userStore.updateUserStatus(userId, status);
        ElMessage.success('状态修改成功');
        await loadUsers();
    } catch (error) {
        ElMessage.error('状态修改失败');
        console.error(error);
    }
};

// 重置筛选
const resetFilter = () => {
    searchKeyword.value = '';
    roleFilter.value = 0;
};

// 页面加载
onMounted(() => {
    loadUsers();
});
</script>

<template>
    <div class="wrapper">
        <el-card shadow="hover" class="user-card">
            <!-- 顶部搜索+筛选区域 -->
            <div class="header-bar">
                <el-input
                    v-model="searchKeyword"
                    placeholder="搜索用户名"
                    clearable
                    @clear="resetFilter"
                    class="search-input"
                    style="margin-right: 1vw;"
                />
                <el-select
                    v-model.number="roleFilter"
                    placeholder="筛选角色"
                    clearable
                    style="width: 12vw;"
                    @clear="roleFilter = 0"
                >
                    <el-option label="全部" :value="0" />
                    <el-option label="学生" :value="1" />
                    <el-option label="老师" :value="2" />
                    <el-option label="管理员" :value="3" />
                </el-select>
                <el-button
                    type="text"
                    @click="resetFilter"
                    style="margin-left: 1vw;"
                >
                    重置筛选
                </el-button>
            </div>
            <el-table :data="filteredUsers" border>
                <el-table-column prop="userId" label="ID" width="50" align="center" />
                <el-table-column prop="username" label="用户名" />
                <el-table-column prop="email" label="邮箱" />
                <el-table-column label="角色" width="100" align="center">
                    <template #default="{ row }">
                        <el-tag :type="row.role === 1 ? 'info' : row.role === 2 ? 'primary' : 'warning'" size="small">
                            {{ roleMap[row.role] }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" width="100" align="center">
                    <template #default="{ row }">
                        <el-switch
                            v-model="row.status"
                            :active-value="1"
                            :inactive-value="0"
                            @change="handleChangeStatus(row.userId, row.status)"
                        />

                    </template>
                </el-table-column>
                <el-table-column label="操作" width="220" align="center">
                    <template #default="{ row }">
                        <el-button type="primary" size="small" @click="openEditDialog(row.userId, row.username, row.email, row.role)">
                            查看
                        </el-button>
                        <el-button type="danger" size="small" @click="handleDeleteUser(row.userId)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
            title="用户信息"
            v-model="editDialogVisible"
            width="30vw"
            :destroy-on-close="true"
        >
            <el-form :model="{ username: editUsername, email: editEmail, role: editRole }">
                <el-form-item label="用户名">
                    <el-input v-model="editUsername" disabled />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="editEmail" disabled />
                </el-form-item>
                <el-form-item label="角色">
                    <el-input :value="roleMap[editRole]" disabled />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="editDialogVisible = false">关闭</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    padding: 2vw;
    .user-card {
        border-radius: 12px;
        padding: 1.5vw;
        box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        .header-bar {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 1.5vh;
            .search-input {
                width: 25vw;
            }
        }
    }
}
</style>
