<template>
  <div class="order-list-container">
    <div class="order-list">
      <el-card v-for="order in paginatedOrders" :key="order.orderid" class="order-card">
        <div class="order-info">
          <el-row>
            <el-col :span="6">
              <strong>订单编号:</strong> {{ order.orderid }}
            </el-col>
            <el-col :span="6">
              <strong>菜品名称:</strong> {{ order.dishid }}
            </el-col>
            <el-col :span="6">
              <strong>时间:</strong> {{ order.time }}
            </el-col>
            <el-col :span="6">
              <strong>菜品数量:</strong> {{ order.num }}
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-empty v-if="!paginatedOrders.length" description="暂无订单" />
    </div>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="orders.length"
        :page-size="pageSize"
        @current-change="handlePageChange"
        class="pagination"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const orders = ref([
]);

const currentPage = ref(1);
const pageSize = 20;

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return orders.value.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
.order-list-container {
  padding: 20px;
}
.order-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.order-card {
  margin-bottom: 20px;
}
.order-info {
  font-size: 14px;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
