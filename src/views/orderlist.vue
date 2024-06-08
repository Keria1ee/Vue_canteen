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
              <strong>菜品名称:</strong> {{ order.dishname }}
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
import { ref, computed,onMounted } from 'vue';
import {getDish, getOrderList} from "@/api/orderlist.js";
import {useTokenStore} from "@/stores/token.js";
const orders = ref([
]);

const currentPage = ref(1);
const pageSize = 10;

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return orders.value.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const getOrders = async () => {
  const payload = {
    uid: useTokenStore().getData().id,
  };
  let result = await getOrderList(payload);
  try {
    if (result.success === 1) {
      orders.value = result.data;
      for (let i = 0; i < orders.value.length; i++) {
        orders.value[i].dishname = await getdishname(orders.value[i].dishid);
      }
    } else {
      console.log('获取订单列表失败');
    }
  } catch (e) {
    console.log(e);
  }
};

const getdishname= async (dishid) => {
  let result = await getDish(dishid);
  try {
    if (result.success === 1) {
      return result.data.dishname;
    } else {
      console.log('获取菜品名称失败');
    }
  } catch (e) {
    console.log(e);
  }
};


onMounted(() => {
  getOrders();

});

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
