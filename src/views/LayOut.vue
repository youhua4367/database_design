<script setup lang="ts">
import {ref} from "vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import { useRouter } from "vue-router";
import {useTokenStore} from "@/store/token.ts";

const router = useRouter();
const tokensStore = useTokenStore();

const keyword = ref('')

// 切换菜单的变量
const activeIndex = ref("/home") // 默认选中Home页菜单


const logout = () =>{
    tokensStore.removeToken()
    router.push("/login")
}

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
                    <div>
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