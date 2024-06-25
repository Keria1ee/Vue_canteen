<template>
  <div class="booking-listing-container">
    <div class="filter-container">
      <el-select v-model="selectedName" placeholder="按名字筛选" @change="handleFilterChange" size="large" clearable>
        <el-option v-for="item in uniqueNames" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="selectedTimeRange" placeholder="按时间段筛选" @change="handleFilterChange" size="large" clearable>
        <el-option v-for="item in uniqueTimeRanges" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="selectedDate" placeholder="按日期筛选" @change="handleFilterChange" size="large" clearable>
        <el-option v-for="item in uniqueDates" :key="item" :label="item" :value="item" />
      </el-select>
    </div>

    <el-row :gutter="20" type="flex" justify="center">
      <el-col
          v-if="filteredData.length"
          v-for="(item, index) in pagedData"
          :key="item.id"
          :xs="24" :sm="12" :md="8" :lg="6" :xl="6"
          class="booking-card-col"
      >
        <el-card class="booking-card" shadow="hover">
          <h3 class="booking-name">{{ item.name }}</h3>
          <p>
            <i class="el-icon-date"></i> 日期: {{ item.date.split(' ')[0] }}
          </p>
          <p class="booking-code">
            <i class="el-icon-document"></i> 预订编码: <span class="highlight">{{ item.code }}</span>
          </p>
          <p class="booking-time">
            <i class="el-icon-time"></i> 时间段:
            <span class="highlight">{{ item.startTime }}</span> -
            <span class="highlight">{{ item.endTime }}</span>
          </p>
        </el-card>
      </el-col>
      <el-col v-else :span="24" class="no-data-col">
        <el-empty description="无预订记录"></el-empty>
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
import {ElSelect, ElOption, ElRow, ElCol, ElCard, ElPagination, ElEmpty, ElMessage} from 'element-plus';
import {useTokenStore} from "@/stores/token.js";
import {getUserReserveList} from "@/api/baofang.js";

const tokenStore = useTokenStore();
const uid = useTokenStore().getData().id;
const data = ref([]);

const currentPage = ref(1);
const pageSize = ref(9);
const selectedName = ref('');
const selectedTimeRange = ref('');
const selectedDate = ref('');

const filteredData = computed(() => {
  let filtered = data.value;
  if (selectedName.value) {
    filtered = filtered.filter(item => item.name === selectedName.value);
  }
  if (selectedTimeRange.value) {
    const [start, end] = selectedTimeRange.value.split('-');
    filtered = filtered.filter(item => item.startTime === start && item.endTime === end);
  }
  if (selectedDate.value) {
    filtered = filtered.filter(item => item.date.startsWith(selectedDate.value));
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

const uniqueDates = computed(() => {
  const dates = data.value.map(item => item.date.split(' ')[0]);
  return [...new Set(dates)];
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleFilterChange = () => {
  currentPage.value = 1; // 过滤条件变化时重置到第一页
};
const getReserveList = async (uid) => {
  let result = await getUserReserveList(uid);
  if (result.success === 1) {
    data.value = result.data;
  } else {
    ElMessage.error('获取预订信息失败');
  }
}
onMounted(() => {
  getReserveList(uid);
});

</script>

<style scoped>
.booking-listing-container {
  padding: 20px;
}
.filter-container {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
.booking-card-col {
  margin-bottom: 20px;
}
.booking-card {
  width: 100%;
  border: 1px solid #ebeef5;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}
.booking-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.booking-name {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
}
.booking-code, .booking-time {
  font-size: 1.2em;
  margin: 10px 0;
}
.highlight {
  color: #6aaef5;
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
