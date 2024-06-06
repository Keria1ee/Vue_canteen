<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import { addPreorder, getPreorderList } from '@/api/preorder.js'
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from "element-plus";

const categorys = ref([])

const userTime = ref(new Date());

const preorder = async (row) => {
  if (row.quantity <= 0) {
    ElMessage.error('数量必须大于0');
    return;
  }
  const payload = ref({
    id: row.id,
    num: row.quantity
  });
  console.log(payload.value)
  let result = await addPreorder(payload.value);
  if (result.success === 1) {
    ElMessage.success('你已经成功预定了' + row['dishname'] + ',数量为:' + row.quantity);
    row.disabled = true
  } else {
    ElMessage.error('预定失败');
    getCategorys();
  }

}

const getCategorys = async () => {
  let result = await getPreorderList();
  if (result.success === 1) {
    categorys.value = result.data.map(category => ({
      ...category,
      quantity: '' // 添加 quantity 属性，初始值为 0
    }));
  } else {
    ElMessage.error('获取菜品信息失败');
  }
}

onMounted(() => {
  getCategorys();

})

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
  return new Date(orderTime) <   userTime.value;
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
              <span>{{ category['dishname'] }}</span>
            </div>
          </template>
          <div class="card-content">
                <!-- 食堂、预约日期和热量 -->
            <div class="card-details">

                <span>预约日期: {{ formatDate(category['time']) }}</span>
                <span>热量: {{ category.extend }}</span>
            </div>
            <div class="card-image-wrapper">
              <el-image style="width: 300px; height: 300px" :src="category.image" :fit="cover"/>

            </div>
          </div>
          <template #footer>
            <div class="footer-container">
              <span>价格: {{ category.price }}</span>
              <div class="footer-content">
                <!-- el-form 和按钮 -->
                <el-form :model="category" :rules="{ quantity: quantityRules }">
                  <el-form-item prop="quantity" class="">
                    <el-input
                        v-model="category.quantity"
                        placeholder="数量"
                        style="width: 100px; margin-right: 10px;"
                        class="quantity-input"
                        :disabled="isButtonDisabled(category['time']) || category.disabled"
                    ></el-input>
                    <el-button
                        :icon="Edit"
                        circle
                        plain
                        type="primary"
                        class="order-button"
                        :disabled="isButtonDisabled(category['time']) || category.disabled"
                        @click="preorder(category)"
                    ></el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-content {
  display: flex;
}

.card-details {
  display: flex;
  flex-direction: column;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-content {
  display: flex;
  align-items: center;
  gap: 10px; /* 间距 */
}

.quantity-input {
  width: 100px;
}

.order-button {
  margin-left: 10px;
}


.card-image-wrapper {
  margin-left: auto;
}
</style>