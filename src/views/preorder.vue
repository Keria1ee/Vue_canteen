<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import {getPreorderList} from '@/api/preorder.js'
import { ref } from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";
const categorys = ref([
  {
    "id": 1,
    "canteen": "七泽食堂",
    "food name": "炒饭",
    "createTime": "2023-09-02 12:06:59",
    "updateTime": "2023-09-02 12:06:59",

  },
  {
    "id": 4,
    "canteen": "天香食堂",
    "food name": "yl",
    "createTime": "2023-09-02 12:08:16",
    "updateTime": "2023-09-02 12:08:16",

  },
  {
    "id": 5,
    "canteen": "锦绣食堂",
    "food name": "js",
    "createTime": "2023-09-02 12:08:33",
    "updateTime": "2023-09-02 12:08:33",
  }
])

// 声明一个异步函数
const preorderlist = async () => {
  let result = await getPreorderList();
  let temp = result.data;
}

const preorder = async (row) => {
  await ElMessageBox.alert('预定成功',
      {
        confirmButtonText: '确定',
        type: 'success'
      }
  )
    row.disabled = true
}

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
      <el-table-column label="序号" width="100" prop="id"> </el-table-column>
      <el-table-column label="所在食堂" prop="canteen"></el-table-column>
      <el-table-column label="菜品名称" prop="food name"></el-table-column>
      <el-table-column label="预定" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit"
                     circle plain
                     type="primary"
                     :disabled="row.disabled"
                     @click="preorder(row)"></el-button>
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