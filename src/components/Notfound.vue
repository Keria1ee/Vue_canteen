<template>
  <el-container class="not-found-container">
    <el-header class="not-found-header">
      <el-icon class="not-found-icon"><warning-filled /></el-icon>
      <h1>404 Not Found</h1>
    </el-header>
    <el-main class="not-found-main">
      <p>对不起，你访问的页面不存在。</p>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </el-main>
  </el-container>
</template>

<script setup>
import { ElContainer, ElHeader, ElMain, ElButton, ElIcon } from 'element-plus';
import { WarningFilled } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import {useTokenStore} from "@/stores/token.js";

const router = useRouter();

const goHome = () => {
  const token = useTokenStore().token;
  if (token){
    router.push('/layout');
  } else {
    router.push('/login');

  }
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f5f5f5;
}

.not-found-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.not-found-icon {
  font-size: 40px;
  color: #ff4d4f;
}

.not-found-main {
  margin-top: 20px;
}

.not-found-main p {
  font-size: 18px;
  color: #666;
}

.el-button {
  margin-top: 20px;
}
</style>
