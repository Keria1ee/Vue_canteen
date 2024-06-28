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
    <div class="statistics">
      <h3>菜品购买百分比统计</h3>
      <div ref="chart" class="chart"></div>
      <h3>平均每餐热量: {{ averageCalories }} kcal</h3>
      <p v-if="averageCalories > 350" class="warning">警告: 您的平均每餐热量高于350 kcal，请减少饮食摄入。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { getDish, getOrderList } from "@/api/orderlist.js";
import { useTokenStore } from "@/stores/token.js";
import * as echarts from 'echarts';

const orders = ref([]);
const currentPage = ref(1);
const pageSize = 10;
const totalCalories = ref(0);
const totalPortions = ref(0);

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return orders.value.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const dishCount = ref({});

const dishPercentage = computed(() => {
  const totalDishes = orders.value.length;
  return Object.keys(dishCount.value).map(dishname => ({
    dishname,
    value: ((dishCount.value[dishname] / totalDishes) * 100).toFixed(2)
  }));
});

const averageCalories = computed(() => {
  return totalPortions.value ? (totalCalories.value / totalPortions.value).toFixed(2) : 0;
});

const getOrders = async () => {
  const payload = {
    uid: useTokenStore().getData().id,
  };
  let result = await getOrderList(payload);
  try {
    if (result.success === 1) {
      orders.value = result.data;
      await getDishesInfo();
      calculateDishCount();
      updateTotalValues();
    } else {
      console.log('获取订单列表失败');
    }
  } catch (e) {
    console.log(e);
  }
};

const getDishesInfo = async () => {
  const dishIdSet = new Set(orders.value.map(order => order.dishid));
  const dishInfoMap = {};

  for (let dishId of dishIdSet) {
    const dish = await getdish(dishId);
    if (dish) {
      dishInfoMap[dishId] = dish;
    }
  }

  orders.value.forEach(order => {
    const dish = dishInfoMap[order.dishid];
    if (dish) {
      order.dishname = dish.dishname;
      order.calories = parseFloat(dish.extend); // assuming extend contains calorie info
    }
  });
};

const getdish = async (dishid) => {
  let result = await getDish(dishid);
  try {
    if (result.success === 1) {
      return result.data;
    } else {
      console.log('获取菜品信息失败');
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

const calculateDishCount = () => {
  dishCount.value = {};
  orders.value.forEach(order => {
    if (dishCount.value[order.dishname]) {
      dishCount.value[order.dishname] += 1;
    } else {
      dishCount.value[order.dishname] = 1;
    }
  });
};

const updateTotalValues = () => {
  totalCalories.value = orders.value.reduce((acc, order) => {
    return acc + (order.calories * order.num);
  }, 0);

  totalPortions.value = orders.value.reduce((acc, order) => {
    return acc + order.num;
  }, 0);
};

const chart = ref(null);
const chartInstance = ref(null);

const initChart = () => {
  chartInstance.value = echarts.init(chart.value);
  updateChart();
};

const updateChart = () => {
  const data = dishPercentage.value.map(item => ({
    name: item.dishname,
    value: parseFloat(item.value)
  }));

  chartInstance.value.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '菜品购买百分比',
        type: 'pie',
        radius: '50%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
};

watch(dishPercentage, updateChart);

onMounted(() => {
  getOrders();
  initChart();
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
.statistics {
  margin-top: 20px;
}
.chart {
  width: 100%;
  height: 400px;
}
.warning {
  color: red;
  font-weight: bold;
}
</style>
