<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import {addPreorder, getPreorderList} from '@/api/preorder.js'
import { ref } from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";
const categorys = ref([
  {
    "id": 1,
    "canteen": "七泽食堂",
    "food name": "炒饭",
    "order time": "2025-09-02 12:06:59",
    "quantity": 0,
  },
  {
    "id": 4,
    "canteen": "天香食堂",
    "food name": "yl",
    "order time": "2023-09-02 12:08:16",
  },
  {
    "id": 5,
    "canteen": "锦绣食堂",
    "food name": "js",
    "order time": "2023-09-02 12:08:33",
  }
])

const userTime = ref(new Date());
// 声明一个异步函数
const preorderlist = async () => {
  let result = await getPreorderList();
  let temp = result.data;
}

const preorder = async (row) => {
  // let result = await addPreorder(row.id, row.quantity);
  // //如果预定成功
  // if (result.success === 1) {
  //   await ElMessageBox.alert('预定成功',
  //       {
  //         confirmButtonText: '确定',
  //         type: 'success'
  //       }
  //   )
  // } else {
  //   await ElMessageBox.alert('预定失败',
  //       {
  //         confirmButtonText: '确定',
  //         type: 'error'
  //       }
  //   )
  // }
    row.disabled = true
}

const isButtonDisabled = (orderTime) => {
  return new Date(orderTime) < userTime.value;
};
</script>



<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>今日可预定菜品</span>
        <div class="extra">
          <el-button type="primary">添加分类</el-button>
        </div>
      </div>
    </template>
    <el-table :data="categorys" style="width: 100%">
      <el-table-column label="序号" width="100" prop="id"></el-table-column>
      <el-table-column label="所在食堂" prop="canteen"></el-table-column>
      <el-table-column label="菜品名称" prop="food name"></el-table-column>
      <el-table-column label="预约日期" prop="order time"></el-table-column>
      <el-table-column label="预定" width="200">
        <template #default="{ row }">
          <el-input
              v-model="row.quantity"
              placeholder="数量"
              style="width: 100px; margin-right: 10px;"
          ></el-input>
          <el-button
              :icon="Edit"
              circle
              plain
              type="primary"
              :disabled="isButtonDisabled(row['order time']) || row.disabled"
              @click="preorder(row)"
          ></el-button>
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
}
</style>