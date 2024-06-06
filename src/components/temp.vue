<script setup>
import { ref } from 'vue'
import { ElMessage } from "element-plus";

const categorys = ref([
  {
    "id": 1,
    "canteen": "七泽食堂",
    "food name": "炒饭",
    "order time": "2024-06-05T10:47:56.000+00:00",
  },
  {
    "id": 4,
    "canteen": "天香食堂",
    "food name": "yl",
    "order time": "2024-06-06T12:08:16.000+00:00",
  },
  {
    "id": 5,
    "canteen": "锦绣食堂",
    "food name": "js",
    "order time": "2024-06-07T12:08:33.000+00:00",
  }
]);

const userTime = ref(new Date());

const preorder = async (row) => {
  if (row.quantity <= 0) {
    ElMessage.error('数量必须大于0');
    return;
  }
  ElMessage.success('你已经成功预定了' + row['food name'] + ',数量为:' + row.quantity);
  row.disabled = true;
}

const isButtonDisabled = (orderTime) => {
  return new Date(orderTime) < userTime.value;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>今日可预定菜品</span>
      </div>
    </template>
    <el-row :gutter="20">
      <el-col :span="24" v-for="category in categorys" :key="category.id">
        <el-card shadow="hover">
          <template #header>
            <div>
              <span>{{ category['food name'] }}</span>
            </div>
          </template>
          <div class="card-content">
            <div class="card-details">
              <span>热量: {{ category.extend }}</span>
              <span>预约日期: {{ formatDate(category['order time']) }}</span>
              <el-form :model="category">
                <el-form-item class="input-button-group">
                  <el-input
                      v-model="category.quantity"
                      placeholder="数量"
                      style="width: 100px; margin-right: 10px;"
                      :disabled="isButtonDisabled(category['order time']) || category.disabled"
                  ></el-input>
                  <el-button
                      icon="Edit"
                      circle
                      plain
                      type="primary"
                      :disabled="isButtonDisabled(category['order time']) || category.disabled"
                      @click="preorder(category)"
                  ></el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-content {
    display: flex;
    flex-direction: column;
  }

  .card-details {
    display: flex;
    flex-direction: column;
  }

  .input-button-group {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
}
</style>
