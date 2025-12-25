<script setup lang="ts">

import {ref} from "vue";

const keyword = ref('')
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
                        <el-button>退出登录</el-button>
                    </div>
                </div>
            </el-header>
            <el-container class="content">
                <el-aside class="aside">
                   <div class="aside-item">
                       <el-card class="aside-card">
                           课程管理
                       </el-card>
                   </div>
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
        .aside {
            height: 93vh;
            width: 15%;
            background-color: #262F28;
            .aside-item {
                width: 100%;
                height: 8vh;
                transition: all 0.3s ease;
                :hover{
                    background-color: #445A5D;
                    transform: translateY(-5px);
                    font-weight: bold;
                }
                .aside-card {
                    font-size: 1vw;
                }
            }
        }
        .main {
            width: 85vw;
            background-color: #F0F5F2;
        }
    }
}
</style>