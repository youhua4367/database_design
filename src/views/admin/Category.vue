<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCategoryStore } from '@/store/admin/category.ts';

const categoryStore = useCategoryStore();

// 搜索相关
const searchKeyword = ref('');
// 筛选后的分类列表
const filteredCategories = computed(() => {
    if (!searchKeyword.value.trim()) {
        return categoryStore.categories;
    }
    // 按分类名称模糊搜索
    return categoryStore.categories.filter(category =>
        category.categoryName.toLowerCase().includes(searchKeyword.value.trim().toLowerCase())
    );
});

// 新增分类弹窗
const addDialogVisible = ref(false);
const newCategoryName = ref('');

// 编辑分类弹窗
const editDialogVisible = ref(false);
const editCategoryName = ref('');
const editCategoryId = ref<number | null>(null);


// 获取分类列表
const loadCategories = async () => {
    try {
        await categoryStore.getCategories();
    } catch (error) {
        ElMessage.error('加载分类列表失败，请重试');
        console.error('加载分类失败：', error);
    }
};

// 新增分类
const handleCreateCategory = async () => {
    if (!newCategoryName.value.trim()) {
        ElMessage.warning('请输入分类名称');
        return;
    }
    try {
        await categoryStore.createCategory(newCategoryName.value.trim());
        ElMessage.success('分类创建成功');
        addDialogVisible.value = false;
        newCategoryName.value = '';
        await loadCategories(); // 刷新列表
    } catch (error) {
        ElMessage.error('创建分类失败');
        console.error('创建分类失败：', error);
    }
};

// 打开编辑弹窗
const openEditDialog = (categoryId: number, categoryName: string) => {
    editCategoryId.value = categoryId;
    editCategoryName.value = categoryName;
    editDialogVisible.value = true;
};

// 提交编辑
const handleUpdateCategory = async () => {
    if (!editCategoryName.value.trim() || editCategoryId.value === null) {
        ElMessage.warning('请输入分类名称');
        return;
    }
    try {
        await categoryStore.updateCategory(editCategoryId.value, editCategoryName.value.trim());
        ElMessage.success('分类更新成功');
        editDialogVisible.value = false;
        editCategoryId.value = null;
        editCategoryName.value = '';
        await loadCategories(); // 刷新列表
    } catch (error) {
        ElMessage.error('更新分类失败');
        console.error('更新分类失败：', error);
    }
};

// 删除分类
const handleDeleteCategory = async (categoryId: number) => {
    try {
        // confirm 弹窗
        await ElMessageBox.confirm(
            '确定要删除该分类吗？删除后关联的课程等数据可能受影响',
            '删除确认',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        );
        await categoryStore.deleteCategory(categoryId);
        ElMessage.success('分类删除成功');
        await loadCategories();
    } catch (error: any) {
        // 排除用户取消操作
        if (error !== 'cancel' && error !== 'close') {
            ElMessage.error('删除分类失败');
            console.error('删除分类失败：', error);
        }
    }
};

// 重置搜索
const resetSearch = () => {
    searchKeyword.value = '';
};

// 页面加载时获取分类
onMounted(() => {
    loadCategories();
});
</script>

<template>
    <div class="wrapper">
        <el-card shadow="hover" class="category-card">
            <!-- 顶部搜索+新增区域 -->
            <div class="header-bar">
                <div class="search-box">
                    <el-input
                        v-model="searchKeyword"
                        placeholder="请输入分类名称搜索"
                        clearable
                        @clear="resetSearch"
                        class="search-input"
                    />
                </div>
                <el-button
                    type="primary"
                    @click="addDialogVisible = true"
                >
                    新增分类
                </el-button>
            </div>
            <!-- 分类列表表格 -->
            <div class="table-container">
                <!-- 分类表格 -->
                <el-table :data="filteredCategories" border>
                    <el-table-column prop="categoryId" label="ID" width="50" align="center" />
                    <el-table-column prop="categoryName" label="分类名称" />
                    <el-table-column label="操作" width="200" align="center">
                        <template #default="{ row }">
                            <el-button
                                type="primary"
                                size="small"
                                @click="openEditDialog(row.categoryId, row.categoryName)"
                            >
                                编辑
                            </el-button>
                            <el-button
                                type="danger"
                                size="small"
                                @click="handleDeleteCategory(row.categoryId)"
                            >
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <!-- 新增分类弹窗 -->
        <el-dialog
            title="新增分类"
            v-model="addDialogVisible"
            width="25vw"
            :close-on-click-modal="false"
            :destroy-on-close="true"
        >
            <el-form :model="{ name: newCategoryName }">
                <el-form-item label="分类名称" required>
                    <el-input
                        v-model="newCategoryName"
                        placeholder="请输入分类名称"
                        maxlength="50"
                        show-word-limit
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="addDialogVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="handleCreateCategory"
                >
                    确认创建
                </el-button>
            </template>
        </el-dialog>
        <!-- 编辑分类弹窗 -->
        <el-dialog
            title="编辑分类"
            v-model="editDialogVisible"
            width="25vw"
            :destroy-on-close="true"
        >
            <el-form :model="{ name: editCategoryName }">
                <el-form-item label="分类名称" required>
                    <el-input
                        v-model="editCategoryName"
                        placeholder="请输入分类名称"
                        maxlength="50"
                        show-word-limit
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="editDialogVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="handleUpdateCategory"
                >
                    保存修改
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    padding: 2vw;

    .category-card {
        border-radius: 12px;
        padding: 1.5vw;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        .header-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5vh;
            padding-bottom: 1vh;
            border-bottom: 1px solid #f0f0f0;
            .search-box {
                width: 20vw;
            }
        }
    }
}
</style>