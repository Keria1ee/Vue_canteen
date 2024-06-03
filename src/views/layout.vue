<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom, Clock, ChatDotRound, Discount
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="400px">
      <div class="el-aside__logo"></div>
      <el-menu active-text-color="#d9ead3" background-color="#7e9d5e"  text-color="#CEC7B2FF"
               router>
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
            <discount />
          </el-icon>
          <span>餐食购买</span>
        </el-menu-item>
        <el-menu-item index="/room">
          <el-icon>
            <Clock />
          </el-icon>
          <span>房间预约</span>
        </el-menu-item>
        <el-sub-menu >
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
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>用户：<strong>Würger</strong></div>
        <el-dropdown placement="bottom-end">
                        <span class="el-dropdown__box">
                            <el-avatar :src="avatar" />
                            <el-icon>
                                <CaretBottom />
                            </el-icon>
                        </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">查看订单</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
          <router-view ></router-view>
      </el-main>
      <!-- 底部区域 -->
      <el-footer>食堂预定系统 ©2024 Created by Würger</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #7e9d5e;

    &__logo {
      height: 120px;
      background: url('@/assets/hit.png') no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

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
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>