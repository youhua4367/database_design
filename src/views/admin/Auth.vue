<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { useTeacherAuthStore } from '@/store/admin/auth.ts';

const teacherAuthStore = useTeacherAuthStore();

// 状态筛选（-1=全部，0-未认证，1-审核中，2-已审核）
const statusFilter = ref<number>(-1);

// 状态映射
const statusMap: Record<number, string> = {
    0: '未认证',
    1: '审核中',
    2: '已审核'
};

// 筛选后的认证列表
const filteredAuthList = computed(() => {
    let result = teacherAuthStore.authList;

    if (statusFilter.value !== -1) {
        result = result.filter(auth => auth.status === statusFilter.value);
    }

    return result;
});

// 获取认证列表
const loadAuthList = async () => {
    try {
        await teacherAuthStore.getPendingAuthList();
    } catch (error) {
        ElMessage.error('加载教师认证失败');
        console.error(error);
    }
};

// 审核认证（通过）
const handleApprove = async (authId: number) => {
    try {
        await teacherAuthStore.approveAuth(authId, 2);
        ElMessage.success('审核通过');
        await loadAuthList();
    } catch (error) {
        ElMessage.error('审核失败');
        console.error(error);
    }
};

// 重置筛选
const resetFilter = () => {
    statusFilter.value = -1;
};

// 页面加载
onMounted(() => {
    loadAuthList();
});
</script>

<template>
    <div class="wrapper">
        <el-card shadow="hover" class="auth-card">
            <div class="header-bar">
                <el-select
                    v-model.number="statusFilter"
                    placeholder="筛选状态"
                    clearable
                    style="width: 15vw;"
                    @clear="resetFilter"
                >
                    <el-option label="全部" :value="-1" />
                    <el-option label="未认证" :value="0" />
                    <el-option label="审核中" :value="1" />
                    <el-option label="已审核" :value="2" />
                </el-select>
                <el-button
                    type="text"
                    @click="resetFilter"
                    style="margin-left: 1vw;"
                >
                    重置筛选
                </el-button>
            </div>
            <el-table :data="filteredAuthList" border>
                <el-table-column prop="authId" label="认证ID" width="90" align="center" />
                <el-table-column prop="teacherId" label="教师ID" width="100" align="center" />
                <el-table-column prop="material" label="认证材料" />
                <el-table-column prop="applyTime" label="申请时间" width="180" align="center" />
                <el-table-column label="状态" width="100" align="center">
                    <template #default="{ row }">
                        {{ statusMap[row.status] }}
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template #default="{ row }">
                        <el-button
                            type="success"
                            size="small"
                            v-if="row.status !== 2"
                            @click="handleApprove(row.authId)"
                        >
                            审核通过
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    padding: 2vw;

    .auth-card {
        border-radius: 12px;
        padding: 1.5vw;
        box-shadow: 0 2px 12px rgba(0,0,0,0.06);

        .header-bar {
            display: flex;
            align-items: center;
            margin-bottom: 1.5vh;
        }
    }
}
</style>
