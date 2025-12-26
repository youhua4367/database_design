<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {useCourseStore} from "@/store/teacher/useCourseStore.ts";
import avatar from "@/assets/image/login.png"
import {useChapterStore} from "@/store/teacher/useChapterStore.ts";
import type {Chapter} from "@/types/teacher/chapter.ts";
import {ElMessage, ElMessageBox} from "element-plus";

const image = avatar
const route = useRoute();
const courseId = computed<number>(() => {
    return Number(route.params.id);
})
const courseStore = useCourseStore();
const chapterStore = useChapterStore();
const addFromVisible = ref(false);
const updateFormVisible = ref(false);

const addForm = ref<Chapter> ({
    chapterId: 0,
    courseId: courseId.value,
    title: "",
    order: chapterStore.chapters.length + 1
})

const updateForm = ref<Chapter> ({
    chapterId: 0,
    courseId: courseId.value,
    title: chapterStore.selectedChapter?.title || "",
    order: chapterStore.chapters.length + 1
})


// 获取课程信息
const getCourse = (id: number) => {
    courseStore.getSelectedCourse(id);
}

/**
 * 获取课程的章节
 * @param id 课程 id
 */
const getChapter = (id: number) => {
    chapterStore.getChapters(id);
}

// 新增章节
const addChapter = () => {
    chapterStore.createChapter(addForm.value);
    addFromVisible.value = false;
    ElMessage.success("新增章节成功！")
}

// 修改章节
const updateTitle = (id: number) => {
    updateFormVisible.value = true;
    chapterStore.selectChapter(id)
    updateForm.value.chapterId = chapterStore.selectedChapterId || 0
}

const updateChapter = () => {
    chapterStore.updateChapter(updateForm.value, courseId.value);
    updateFormVisible.value = false;
    ElMessage.success("修改章节成功！")
}
// 删除章节
const deleteTitle = async (chapterId: number) => {
    try {
        await ElMessageBox.confirm(
            "确定要删除该章节吗？删除后无法恢复",
            "温馨提示",
            {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }
        );
        await chapterStore.deleteChapter(chapterId, courseId.value);
        ElMessage.success("章节删除成功");
    } catch (error) {
        ElMessage.info("已取消删除");
    }
};

onMounted(async () => {
    await courseStore.getCourses();
    getCourse(courseId.value);
    getChapter(courseId.value);
})

</script>

<template>
    <el-container class="wrapper">
        <el-header class="header">
            <el-card class="header-card">
                <img :src="image" alt="" style="width:200px; height:200px;">
                <div>课程名称：{{ courseStore.selectedCourse?.courseName }}</div>
                <div>课程描述：{{ courseStore.selectedCourse?.description }}</div>
            </el-card>
        </el-header>
        <el-container class="content">
            <el-aside class="aside">
                <div class="aside-header">
                    <el-button type="primary" @click="addFromVisible = true">
                        新增章节
                    </el-button>
                </div>
                <el-menu class="chapter-menu">
                    <el-menu-item
                        v-for="chapter in chapterStore.chaptersByOrder"
                        :key="chapter.chapterId"
                        class="chapter-item"
                    >
                        <!-- 章节标题 -->
                        <span class="chapter-title">{{ chapter.title }}</span>

                        <div class="chapter-actions">
                            <div class="update" @click="updateTitle(chapter.chapterId)">
                               <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                            </div>
                            <div class="delete" @click.stop="deleteTitle(chapter.chapterId)">
                                <font-awesome-icon icon="fa-solid fa-trash-can" />
                            </div>
                        </div>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container class="main">
                <el-header class="main-header">
                    <h1>java的起源</h1>
                </el-header>
                <el-main class="main-content">
                    <div>
                        Java是一种广泛使用的计算机编程语言，拥有跨平台、面向对象、泛型编程的特性，广泛应用于企业级Web应用开发和移动应用开发。
                    </div>
                </el-main>
            </el-container>
        </el-container>

        <el-dialog v-model="addFromVisible"
                   title="添加新章节"
                   width="30vw"
                   class="chapter-add-dialog"
                   center
                   destroy-on-close>
            <el-form
                :model="addForm"
                class="course-form"
                size="default"
                label-width="5vw"
            >
                <!-- 章节名称 -->
                <el-form-item label="课程名" prop="courseName">
                    <el-input
                        v-model="addForm.title"
                        autocomplete="off"
                        placeholder="请输入章节标题"
                        class="course-input"
                    />
                </el-form-item>
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="addFromVisible = false">取消</el-button>
                    <el-button type="primary" @click="addChapter">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="updateFormVisible"
                   title="修改章节"
                   width="30vw"
                   class="chapter-add-dialog"
                   center
                   destroy-on-close>
            <el-form
                :model="updateForm"
                class="course-form"
                size="default"
                label-width="5vw"
            >
                <!-- 章节名称 -->
                <el-form-item label="课程名" prop="courseName">
                    <el-input
                        v-model="updateForm.title"
                        autocomplete="off"
                        placeholder="请输入章节标题"
                        class="course-input"
                    />
                </el-form-item>
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="updateFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="updateChapter">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </el-container>
</template>

<style scoped lang="scss">
.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
        display: flex;
        width: 100%;
        height: 40%;
        align-items: flex-start;
        justify-content: center;
        .header-card {
            width: 100%;
            height: 100%;
            div:nth-child(2) {
                font-weight: bold;
                font-size: 1.5vw;
                margin-top: 1vh;
            }

            div:nth-child(3) {
                font-size: 0.8vw;
                color: #666;
                margin-top: 0.5vh;
            }
        }
    }
    .content {
        margin-top: 2vh;
        width: 100%;
        height: 100%;
        border:1px solid black;
        .aside {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 20%;
            border: 1px solid black;
            .aside-header {
                height: 10%;
                width: 100%;
                .el-button {
                    width: 100%;
                    height: 100%;
                }
            }
            .chapter-menu {
                width: 100%;
                .chapter-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    &:hover {
                        background-color: #e8f4ff;
                    }
                    .chapter-title {
                        flex: 1;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .chapter-actions {
                        display: none;
                        gap: 1vw;
                    }
                    &:hover .chapter-actions {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        z-index: 1000;
                        font-size: 1vw;
                        text-align: center;

                        div:nth-child(1) {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        div:nth-child(2) {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                }
            }
        }
        .main {
            width: 80%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            border: 1px solid green;
            .main-header {
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                margin-top: 2vh;
            }
            .main-content {
                margin-top: 1vh;
            }

        }
    }
    :deep(.chapter-add-dialog) {
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

        // 章节表单样式
        .chapter-form {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1vh;
            padding: 10px 0;

            // 输入框样式
            .chapter-input {
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
}
</style>