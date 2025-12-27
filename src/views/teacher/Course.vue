<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useCourseStore} from "@/store/teacher/course.ts";
import type {CoursePost} from "@/types/teacher/course.ts";
import {ElMessage} from "element-plus";
import {useCategoryStore} from "@/store/user/useCategory.ts";
import CourseList from "@/components/CourseList.vue";

// 课程存储
const categoryStore = useCategoryStore()
const courseStore = useCourseStore()
const dialogFormVisible = ref(false)
const updateDialogVisible = ref(false)
const form = ref<CoursePost>({
    courseName: "",
    description: "",
    categoryName: "",
})


const updateForm = ref<CoursePost>({
    courseName: "",
    description: "",
    categoryName: "",
})
// 添加课程
const addCourse = async () => {
    // 非空校验（必填项）
    if (!form.value.courseName.trim()) {
        ElMessage.error('请输入课程名称！');
        return;
    }
    if (!form.value.categoryName.trim()) {
        ElMessage.error('请选择/输入课程分类！');
        return;
    }

    try {
        await courseStore.createCourse(form.value);
        ElMessage.success('课程添加成功！');
        await courseStore.getCourses();       // 刷新列表，立即显示新添加的课程
        dialogFormVisible.value = false;
        // 重置表单
        form.value = {
            courseName: "",
            description: "",
            categoryName: "",
        };
    } catch (error) {
        ElMessage.error('添加课程失败：' + (error as Error).message);
        console.error('添加课程失败：', error); // 控制台打印详细错误
    }
}

const updateCourse = () => {
    courseStore.updateCourse(courseStore.selectedCourseId, updateForm.value);
    updateDialogVisible.value = false;
    ElMessage.success("更改课程信息成功！")

}

const showUpdateForm = async (courseId: number) => {
    courseStore.getSelectedCourse(courseId)
    const selectedCourse = courseStore.selectedCourse
    updateForm.value = {
        courseName: selectedCourse?.courseName || "",
        description: selectedCourse?.description || "",
        categoryName:  selectedCourse?.categoryName || "",
    }
    updateDialogVisible.value = true
}

onMounted(() => {
    courseStore.getCourses();
    courseStore.getCategory();
    categoryStore.getCategoryList();
})
</script>

<template>
    <el-container class="wrapper">
        <el-header class="header">
            <el-button class="add-course" @click="dialogFormVisible=true">添加课程</el-button>

        </el-header>
        <!--主体内容-->
        <CourseList
            :courses-by-category="courseStore.coursesByCategory"
            @course-click="showUpdateForm"
        />

        <!--新增课程弹窗-->
        <el-dialog v-model="dialogFormVisible"
                   title="添加新课程"
                   width="30vw"
                   class="course-add-dialog"
                   center
                   destroy-on-close>
            <el-form
                :model="form"
                class="course-form"
                size="default"
                label-width="5vw"
            >
            <!-- 课程名 -->
            <el-form-item label="课程名" prop="courseName">
                <el-input
                    v-model="form.courseName"
                    autocomplete="off"
                    placeholder="请输入课程名称"
                    class="course-input"
                />
            </el-form-item>

            <!-- 课程分类 -->
                <el-form-item label="课程分类" prop="categoryName">
                    <el-select
                        v-model="form.categoryName"
                        placeholder="请选择课程分类"
                        class="course-input"
                        clearable
                        filterable
                    >
                        <el-option
                            v-for="category in categoryStore.categoryList"
                            :key="category.categoryId"
                            :label="category.categoryName"
                            :value="category.categoryName"
                        />
                        <el-option v-if="!categoryStore.categoryList.length" label="暂无分类" value="" disabled />
                    </el-select>
                </el-form-item>

            <!-- 课程描述 -->
            <el-form-item label="课程描述" prop="description">
                <el-input
                    v-model="form.description"
                    autocomplete="off"
                    placeholder="请输入课程详细描述"
                    type="textarea"
                    :rows="4"
                    class="course-input"
                />
            </el-form-item>
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="addCourse">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!--更新课程弹窗 -->
        <el-dialog v-model="updateDialogVisible"
                   title="修改课程"
                   width="30vw"
                   class="course-add-dialog"
                   center
                   destroy-on-close>
            <el-form
                :model="updateForm"
                class="course-form"
                size="default"
                label-width="5vw"
            >
                <!-- 课程名 -->
                <el-form-item label="课程名" prop="courseName">
                    <el-input
                        v-model="updateForm.courseName"
                        autocomplete="off"
                        placeholder="请输入课程名称"
                        class="course-input"
                    />
                </el-form-item>

                <!-- 课程分类 -->
                <el-form-item label="课程分类" prop="categoryName">
                    <el-select
                        v-model="updateForm.categoryName"
                        placeholder="请选择课程分类"
                        class="course-input"
                        clearable
                        filterable
                    >
                        <el-option
                            v-for="category in categoryStore.categoryList"
                            :key="category.categoryId"
                            :label="category.categoryName"
                            :value="category.categoryName"
                        />
                        <el-option v-if="!categoryStore.categoryList.length" label="暂无分类" value="" disabled />
                    </el-select>
                </el-form-item>

                <!-- 课程描述 -->
                <el-form-item label="课程描述" prop="description">
                    <el-input
                        v-model="updateForm.description"
                        autocomplete="off"
                        placeholder="请输入课程详细描述"
                        type="textarea"
                        :rows="4"
                        class="course-input"
                    />
                </el-form-item>
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="updateDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="updateCourse">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </el-container>
</template>

<style scoped lang="scss">
.wrapper {
    height: 100%;
    width: 100%;
    .header {
        display: flex;
        justify-content: flex-start;
        background-color: deepskyblue;
    }

    :deep(.course-add-dialog) {
        .el-dialog__title {
            font-size: 1.5vw;
            font-weight: bold;
            color: #1E88E5;
        }

        // 弹窗内容区
        .el-dialog__body {
            padding: 0.5vw;
            box-sizing: border-box;
        }

        // 课程表单样式
        .course-form {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1vh;
            padding: 10px 0;

            // 输入框样式
            .course-input {
                width: 20vw;
                border-radius: 6px;
                border: 1px solid #dcdfe6;

                &:focus {
                    border-color: #1E88E5;
                    box-shadow: 0 0 8px rgba(30, 136, 229, 0.2);
                }
            }

            // 表单项标签
            .el-form-item__label {
                font-size: 14px;
                color: #555;
                font-weight: 500;
            }
        }

        // 弹窗底部按钮区
        .dialog-footer {
            display: flex;
            justify-content: center;
            gap: 3vw;
        }
    }
    :deep(.student-detail-dialog) {
        // 弹窗标题样式
        .el-dialog__title {
            font-size: 1.2vw;
            font-weight: 600;
            color: #1E88E5;
            padding: 5px 0;
        }

        // 弹窗内容区
        .el-dialog__body {
            padding: 2vw;
            box-sizing: border-box;
        }

        // 学生表格样式优化
        .el-table {
            --el-table-header-text-color: #1E88E5; // 表头文字颜色
            --el-table-row-hover-bg-color: #f0f7ff; // 行悬浮背景色
            --el-table-border-color: #e8e8e8; // 表格边框颜色
            font-size: 0.9vw;

            // 表头样式
            .el-table__header {
                .el-table-cell {
                    background-color: #f8fbff;
                    font-weight: 500;
                }
            }

            // 单元格内边距
            .el-table-cell {
                padding: 12px 0;
                text-align: center;
            }

            // 斑马纹样式强化
            .el-table__row--striped {
                background-color: #fafafa;
            }
        }

        // 无学生数据提示样式
        div:has(> .el-empty-tip) { // 匹配无数据的提示容器
            text-align: center;
            padding: 4vw 0;
            color: #999;
            font-size: 1vw;
            line-height: 1.5;
        }

        // 弹窗底部按钮
        .el-dialog__footer {
            padding: 1vw 0;
            .el-button {
                padding: 0.6vw 2vw;
                border-radius: 6px;
                font-size: 0.9vw;
                background-color: #f5f5f5;
                border-color: #dcdfe6;

                &:hover {
                    background-color: #e8e8e8;
                    color: #333;
                }
            }
        }
    }
}
</style>