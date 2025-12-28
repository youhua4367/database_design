<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCourseStore } from '@/store/admin/course.ts';

const courseStore = useCourseStore();

// 筛选状态（0-未审核，1-审核中，2-已通过）
const statusFilter = ref<number>(-1);

// 状态映射
const statusMap: Record<number, string> = {
    0: '未审核',
    1: '审核中',
    2: '已通过'
};

// 筛选后的课程列表
const filteredCourses = computed(() => {
    let result = courseStore.courses;

    if (statusFilter.value !== -1) {
        result = result.filter(course => course.status === statusFilter.value);
    }

    return result;
});

// 获取课程列表
const loadCourses = async () => {
    try {
        await courseStore.getPendingCourses();
    } catch (error) {
        ElMessage.error('加载课程列表失败');
        console.error(error);
    }
};

// 审核课程
const handleApproveCourse = async (courseId: number, status: number) => {
    try {
        await courseStore.approveCourse(courseId, status);
        ElMessage.success('课程状态修改成功');
        await loadCourses();
    } catch (error) {
        ElMessage.error('课程状态修改失败');
        console.error(error);
    }
};

// 删除课程
const handleDeleteCourse = async (courseId: number) => {
    try {
        await ElMessageBox.confirm(
            '确定要删除该课程吗？',
            '删除确认',
            { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
        );
        await courseStore.deleteCourse(courseId);
        ElMessage.success('删除成功');
        await loadCourses();
    } catch (error: any) {
        if (error !== 'cancel' && error !== 'close') {
            ElMessage.error('删除失败');
        }
    }
};

// 重置筛选
const resetFilter = () => {
    statusFilter.value = -1;
};

// 页面加载
onMounted(() => {
    loadCourses();
});
</script>

<template>
    <div class="wrapper">
        <el-card shadow="hover" class="course-card">
            <div class="header-bar">
                <el-select
                    v-model.number="statusFilter"
                    placeholder="筛选状态"
                    clearable
                    style="width: 15vw;"
                    @clear="resetFilter"
                >
                    <el-option label="全部" :value="-1" />
                    <el-option label="未审核" :value="0" />
                    <el-option label="审核中" :value="1" />
                    <el-option label="已通过" :value="2" />
                </el-select>
                <el-button
                    type="text"
                    @click="resetFilter"
                    style="margin-left: 1vw;"
                >
                    重置筛选
                </el-button>
            </div>
            <!-- 课程表格 -->
            <el-table :data="filteredCourses" border>
                <el-table-column prop="courseId" label="ID" width="80" align="center" />
                <el-table-column prop="courseName" label="课程名称" />
                <el-table-column prop="teacherId" label="教师ID" width="100" align="center" />
                <el-table-column prop="categoryName" label="分类" width="120" align="center" />
                <el-table-column label="状态" width="100" align="center">
                    <template #default="{ row }">
                        {{ statusMap[row.status] }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="220" align="center">
                    <template #default="{ row }">
                        <el-button
                            type="success"
                            size="small"
                            v-if="row.status !== 2"
                            @click="handleApproveCourse(row.courseId, 2)"
                        >
                            审核通过
                        </el-button>
                        <el-button
                            type="danger"
                            size="small"
                            @click="handleDeleteCourse(row.courseId)"
                        >
                            删除
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
    .course-card {
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
