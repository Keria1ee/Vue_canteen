<template>
  <el-table :data="orders" style="width: 100%">
    <el-table-column prop="orderid" label="订单ID" width="180"></el-table-column>
    <el-table-column prop="uid" label="用户ID" width="180"></el-table-column>
    <el-table-column prop="dishiid" label="菜品ID" width="180"></el-table-column>
    <el-table-column prop="time" label="时间" width="180"></el-table-column>
    <el-table-column prop="num" label="数量" width="180"></el-table-column>
  </el-table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const orders = ref([]);

// const fetchOrders = async () => {
//   try {
//     const response = await axios.get('/api/orders');
//     orders.value = response.data;
//   } catch (error) {
//     console.error('Failed to fetch orders:', error);
//   }
// };
//
// onMounted(() => {
//   fetchOrders();
// });
</script>

<style scoped>
</style>
