<script setup>
import { ref } from 'vue'
import {onMounted} from "vue"
import {ElMessage} from "element-plus";
import {ArrowRight, Edit} from "@element-plus/icons-vue";

const stockList = ref([
  {
    "name": "炒饭",
    "price": 10,
    "stock": 100,
    "order time": "2025-06-05 12:06:59",

  },
  {
    "name": "炒菜",
    "price": 20,
    "stock": 100,
    "order time": "2023-09-02 12:08:16",
  },
  {
    "name": "炒菜",
    "price": 30,
    "stock": 100,
    "order time": "2023-09-02 12:08:33",
  }
])

const userTime = ref(new Date());



const quantityRules = [
  { validator: (rule, value, callback) => {
      if (value <= 0) {
        callback(new Error('数量必须大于0'));
      } else {
        callback();
      }
    }, trigger: 'blur' },
];



const isButtonDisabled = (orderTime) => {
  return new Date(orderTime) > userTime.value;
};
</script>


<template>

  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>今日可购买菜品</span>
      </div>
    </template>
  <el-table :data="stockList" style ="width: 100%">
    <el-table-column prop="name" label="菜品名称"></el-table-column>
    <el-table-column prop="price" label="价格"></el-table-column>
    <el-table-column prop="stock" label="库存"></el-table-column>
    <el-table-column label="购买" width="200">
    <template #default ="{row}">
      <el-form :model="row" :rules="{ quantity: quantityRules }">
        <el-form-item prop="quantity" class="input-button-group">
          <el-input
              v-model="row.quantity"
              placeholder="数量"
              style="width: 100px; margin-right: 10px;"
              :disabled="isButtonDisabled(row['order time']) || row.disabled"
          ></el-input>
          <el-button
              :icon="ArrowRight"
              circle
              plain
              type="primary"
              :disabled="isButtonDisabled(row['order time']) || row.disabled"
              @click=""
          ></el-button>
        </el-form-item>
      </el-form>
    </template>
    </el-table-column>
    <template #empty>
      <el-empty description="没有数据" />
    </template>
  </el-table>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .input-button-group {
    display: flex;
    align-items: center;
  }
}
</style>