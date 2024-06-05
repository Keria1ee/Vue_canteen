<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import {addPreorder, getPreorderList} from '@/api/preorder.js'
import { ref,onMounted } from 'vue'
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
  if(row.quantity <= 0){
    ElMessage.error('数量必须大于0');
    return;
  }
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
  //
  //打印菜品信息
  ElMessage.success('你已经成功预定了' + row['food name'] + ',数量为:' + row.quantity)
    row.disabled = true
}

const getStockList = async () => {
  // let result = await getStockList();
  //
  // if (result.success === 1) {
  //   categorys.value = result.data;
  // } else {
  //   ElMessage.error('获取菜品信息失败');
  // }
}

// onMounted(() => {
//   getStockList();
// })

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
  return new Date(orderTime) < userTime.value;
};
</script>



<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>今日可预定菜品</span>
      </div>
    </template>
    <el-table :data="categorys" style="width: 100%">
      <el-table-column label="序号" width="100" prop="id"></el-table-column>
      <el-table-column label="所在食堂" prop="canteen"></el-table-column>
      <el-table-column label="菜品名称" prop="food name"></el-table-column>
      <el-table-column label="预约日期" prop="order time"></el-table-column>
      <el-table-column label="预定" width="200">
        <template #default="{ row }">
          <el-form :model="row" :rules="{ quantity: quantityRules }">
            <el-form-item prop="quantity" class="input-button-group">
              <el-input
                  v-model="row.quantity"
                  placeholder="数量"
                  style="width: 100px; margin-right: 10px;"
                  :disabled="isButtonDisabled(row['order time']) || row.disabled"
              ></el-input>
              <el-button
                  :icon="Edit"
                  circle
                  plain
                  type="primary"
                  :disabled="isButtonDisabled(row['order time']) || row.disabled"
                  @click="preorder(row)"
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