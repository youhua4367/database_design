<script setup lang="ts">
import {ref} from "vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import { useRouter } from "vue-router";
import {useTokenStore} from "@/store/token.ts";
import {ElMessage} from "element-plus";
import {updateUserProfileService, userInfoService} from "@/api/user.ts";

const router = useRouter();
const tokensStore = useTokenStore();

const keyword = ref('')

// 切换菜单的变量
const activeIndex = ref("/teacher/home") // 默认选中Home页菜单


const logout = () =>{
    tokensStore.removeToken()
    router.push("/login")
}

/** 个人信息弹窗控制 */
const profileDialogVisible = ref(false);

/** 个人信息表单 */
const profileForm = ref({
    email: "",
    name: "",
    gender: 1,
    title: "",
    intro: ""
});

/** 打开个人信息弹窗 */
const openAuthDialog = async () => {
    try {
        const res = await userInfoService();
        if (res.code === 200 && res.data) {
            const { user, teacher } = res.data;
            profileForm.value.email = user.email || "";
            profileForm.value.name = teacher?.name || "";
            profileForm.value.gender = teacher?.gender ?? 1;
            profileForm.value.title = teacher?.title || "";
            profileForm.value.intro = teacher?.intro || "";
        }
        profileDialogVisible.value = true;
    } catch (error) {
        console.error(error);
        ElMessage.error("加载用户信息失败");
    }
};

/** 保存个人信息 */
const submitProfile = async () => {
    try {
        await updateUserProfileService(profileForm.value);
        ElMessage.success("个人信息修改成功");
        profileDialogVisible.value = false;
    } catch (e) {
        ElMessage.error("修改失败");
    }
};
</script>

<template>
    <div class="common-layout">
        <el-container class="contain">
            <el-header class="header">

                <!--左侧信息栏-->
                <div class="header_left">
                    <div>教务管理系统</div>
                    <div>
                        <font-awesome-icon icon="fa-solid fa-house" />
                        主页
                    </div>
                </div>

                <!--搜索栏-->
                <div class="header_middle">
                    <el-input class="search" v-model="keyword">
                        <template #prefix>
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                        </template>
                    </el-input>
                </div>

                <!--右侧信息栏-->
                <div class="header_right">
                    <div @click="openAuthDialog" style="cursor: pointer">
                        <font-awesome-icon :icon="['fas', 'user']" />
                        个人信息
                    </div>
                    <div>
                        <el-button @click="logout">退出登录</el-button>
                    </div>
                </div>
            </el-header>

            <el-container class="content">
                <el-aside class="aside" ref="asideContainer">
                    <el-menu
                        class="aside-item"
                        mode="vertical"
                        :default-active="activeIndex"
                        router
                        ref="menu">
                        <TeacherMenu/>
                    </el-menu>
                </el-aside>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <!-- 个人信息弹窗 -->
        <el-dialog
            title="个人信息"
            v-model="profileDialogVisible"
            width="35vw"
            :destroy-on-close="true"
        >
            <el-form label-width="80px">
                <el-form-item label="邮箱">
                    <el-input v-model="profileForm.email" />
                </el-form-item>

                <el-form-item label="姓名">
                    <el-input v-model="profileForm.name" />
                </el-form-item>

                <el-form-item label="性别">
                    <el-radio-group v-model="profileForm.gender">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="职称">
                    <el-input v-model="profileForm.title" />
                </el-form-item>

                <el-form-item label="简介">
                    <el-input
                        type="textarea"
                        rows="3"
                        v-model="profileForm.intro"
                    />
                </el-form-item>
            </el-form>

            <template #footer>
                <el-button @click="profileDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitProfile">保存</el-button>
            </template>
        </el-dialog>

    </div>
</template>

<style scoped lang="scss">
.common-layout {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    .header {
        height: 7vh;
        background-color: #649D7F;
        display: flex;
        justify-content: flex-start;
        .header_left {
            display: flex;
            width: 25%;
            justify-content: space-between;
            div {
                &:nth-of-type(1) {
                    font-size: 2vw;
                }
                &:nth-of-type(2) {
                    font-size: 1.5vw;
                    text-align: center;
                    padding-top: 0.6vw;
                }
            }
        }
        .header_middle {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            .search {
                width: 35%;
            }
        }

        .header_right {
            width: 25%;
            display: flex;
            justify-content: flex-end;
            padding-right: 5vw;
            div {
                &:nth-of-type(1) {
                    font-size: 1vw;
                    padding-top: 3vh;
                    padding-right: 1.5vw;
                }
                &:nth-of-type(2) {
                    padding-top: 2.8vh;
                }
            }

        }
    }
    .content {
        //border:1px solid green;
        width: 100%;
        position: relative;
        .aside {
            height: 100vh;
            width: 15%;
            background-color: #262F28;
            position: sticky;
            top: 0;
            :deep(.aside-item) {
                width: 100%;
                height: 100%;
                background-color: transparent;
                transition: all 0.3s ease;

               .aside-card {
                   height: 8vh;
                   line-height: 8vh;
                   border-bottom: 1px solid #333;
                   background-color: #fff;
                   font-size: 1vw;
               }
                :hover {
                    background-color: deepskyblue;
                    transform: translateY(-5px);
                    font-weight: bold;
                }
            }
        }
        .main {
            width: 85%;
            background-color: #F0F5F2;
        }
    }
}
</style>