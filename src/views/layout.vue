<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom,
  Clock,
  ChatDotRound,
  Discount,
  ChatLineSquare
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useTokenStore } from "@/stores/token.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter()
const tokenStore = useTokenStore()
const name = useTokenStore().getData().name
const logout = async () => {
  tokenStore.removeToken()
  await router.push('/login')
  ElMessage.success('退出成功')
}
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="250px">
      <div class="el-aside__logo"></div>
      <el-menu active-text-color="#d9ead3" background-color="#6ea8f3" text-color="#fff" router>
        <el-menu-item index="/canteen">
          <el-icon>
            <Management />
          </el-icon>
          <span>食堂信息</span>
        </el-menu-item>
        <el-menu-item index="/preorder">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>餐食预约</span>
        </el-menu-item>
        <el-menu-item index="/buy">
          <el-icon>
            <Discount />
          </el-icon>
          <span>餐食购买</span>
        </el-menu-item>
        <el-menu-item index="/room">
          <el-icon>
            <Clock />
          </el-icon>
          <span>评论大厅</span>
        </el-menu-item>
        <el-menu-item index="/baofang">
          <el-icon>
            <Crop />
          </el-icon>
          <span>包厢预约</span>
        </el-menu-item>
        <el-sub-menu>
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/order">
            <el-icon>
              <ChatDotRound />
            </el-icon>
            <span>订单查看</span>
          </el-menu-item>
          <el-menu-item index="/baofanglist">
            <el-icon>
              <ChatLineSquare />
            </el-icon>
            <span>包厢预约记录</span>
          </el-menu-item>
          <el-menu-item index="/repassword">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>修改密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header class="el-header">
        <div class="header-title">用户：<strong>{{ name }}</strong></div>
        <el-dropdown placement="bottom-end">
          <span class="el-dropdown__box">
            <el-avatar :src="avatar" />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton" @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 底部区域 -->
      <el-footer class="el-footer">食堂预定系统 ©2024 Created by Würger</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #6ea8f3;
    padding: 20px 0;

    &__logo {
      height: 120px;
      background: url('@/assets/hit.png') no-repeat center / 120px auto;
      margin-bottom: 20px;
    }

    .el-menu {
      border-right: none;

      .el-menu-item,
      .el-sub-menu__title {
        transition: all 0.3s;

        &:hover {
          background-color: #5b8bd8;
        }

        .el-icon {
          margin-right: 10px;
        }
      }
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid #e0e0e0;

    .header-title {
      font-size: 1.2em;
    }

    .el-dropdown__box {
      display: flex;
      align-items: center;
      cursor: pointer;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    background-color: #f5f5f5;
    padding: 10px;
    text-align: center;
    font-size: 14px;
    color: #666;
    border-top: 1px solid #e0e0e0;
  }
}
</style>
