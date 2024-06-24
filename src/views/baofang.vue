<template>
  <div class="room-listing-container">
    <div class="filter-container">
      <el-select v-model="selectedName" placeholder="按名字筛选" @change="handleFilterChange" size="large" clearable>
        <el-option v-for="item in uniqueNames" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="selectedTimeRange" placeholder="按时间段筛选" @change="handleFilterChange" size="large" clearable>
        <el-option v-for="item in uniqueTimeRanges" :key="item" :label="item" :value="item" />
      </el-select>
    </div>

    <el-row :gutter="20" type="flex" justify="center">
      <el-col
          v-if="filteredData.length"
          v-for="(item, index) in pagedData"
          :key="item.id"
          :xs="24" :sm="12" :md="8" :lg="6" :xl="6"
          class="room-card-col"
      >
        <el-card class="room-card" shadow="hover">
          <h3 class="room-name">{{ item.name }}</h3>
          <p>
            <i class="el-icon-user-solid"></i> 空余数量: {{ item.number }}
          </p>
          <p>
            <i class="el-icon-time"></i> 时间段:
            <span class="time-highlight">{{ item.startTime }}</span> -
            <span class="time-highlight">{{ item.endTime }}</span>
          </p>
          <el-button type="primary" round @click="handleBooking(item)">预订</el-button>
        </el-card>
      </el-col>
      <el-col v-else :span="24" class="no-data-col">
        <el-empty description="无可用房间"></el-empty>
      </el-col>
    </el-row>

    <div class="pagination-container" v-if="totalPages > 1">
      <el-pagination
          background
          layout="prev, pager, next, jumper"
          :total="filteredData.length"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElSelect, ElOption, ElRow, ElCol, ElCard, ElPagination, ElMessage } from 'element-plus';
import {getAllroom, reserveRoom} from "@/api/baofang.js";
import {useTokenStore} from "@/stores/token.js";
const tokenStore = useTokenStore()
const uid = useTokenStore().getData().id;
const data = ref([]);
const currentPage = ref(1);
const pageSize = ref(9);
const selectedName = ref('');
const selectedTimeRange = ref('');

const filteredData = computed(() => {
  let filtered = data.value;
  if (selectedName.value) {
    filtered = filtered.filter(item => item.name === selectedName.value);
  }
  if (selectedTimeRange.value) {
    const [start, end] = selectedTimeRange.value.split('-');
    filtered = filtered.filter(item => item.startTime === start && item.endTime === end);
  }
  return filtered;
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / pageSize.value);
});

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredData.value.slice(start, end);
});

const uniqueNames = computed(() => {
  const names = data.value.map(item => item.name);
  return [...new Set(names)];
});

const uniqueTimeRanges = computed(() => {
  const timeRanges = data.value.map(item => `${item.startTime}-${item.endTime}`);
  return [...new Set(timeRanges)];
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleFilterChange = () => {
  currentPage.value = 1; // 过滤条件变化时重置到第一页
};

const getRoomList = async () => {
  let result = await getAllroom();
  if (result.success === 1) {
    data.value = result.data;
  } else {
    ElMessage.error('获取房间信息失败');
  }
}
const handleBooking = async (item) => {
  const payload = {
    name: item.name,
    uid: uid,
    segment: item.segment
  }
  console.log(payload)
  let result = await reserveRoom(payload);
  if (result.success === 1) {
    ElMessage.success('你已经成功预订了' + item.name + '的包厢,时间段为:' + item.startTime + '-' + item.endTime + ',进入个人中心查看预约码');
    getRoomList();
  } else {
    ElMessage.error(result.message ? result.message : '预订失败');
    getRoomList();
  }
}

onMounted(() => {
  getRoomList();
});
</script>

<style scoped>
.room-listing-container {
  padding: 20px;
}
.filter-container {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
.room-card-col {
  margin-bottom: 20px;
}
.room-card {
  width: 100%;
}
.time-highlight {
  font-weight: bold;
}
.no-data-col {
  text-align: center;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
