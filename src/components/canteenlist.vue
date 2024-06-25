<template>
  <el-card shadow="hover" class="main-card">
    <el-main>
      <el-row :gutter="20" class="main-content">
        <el-col :span="6">
          <el-carousel :interval="4000" height="400px">
            <el-carousel-item v-for="(src, index) in imageSrcs" :key="index">
              <img :src="src" alt="Image" class="main-image" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="18" class="text-section">
          <h2 class="main-text">{{ mainText }}</h2>
          <p class="description">{{ description }}</p>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="card-container">
        <el-col :span="8" v-for="card in cards" :key="card.id">
          <el-card shadow="hover" class="dish-card">
            <template #header>
              <div class="card-header">
                <span>特色菜</span>
              </div>
            </template>
            <div class="card-content">
              <img :src="card.image" alt="Dish Image" class="card-image" />
              <div class="card-details">
                <span class="card-name">{{ card.dishname }}</span>
                <span class="card-describe">{{ card.describe }}</span>
                <div class="card-footer">
                  <span>价格: {{ card.price }}</span>
                  <el-button type="primary" @click="order" class="order-button">购买</el-button>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-card>
</template>

<script setup>
import { defineProps,ref } from 'vue';
import {
  ElCard,
  ElMain,
  ElRow,
  ElCol,
  ElCarousel,
  ElCarouselItem, ElMessage
} from 'element-plus';
import {onMounted} from "vue";
import {dishidListService} from '@/api/canteen.js';
import router from "@/router/index.js";
// 定义传入的 props
const props = defineProps({
  imageSrcs: {
    type: Array,
    required: true,
  },
  mainText: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cardinfom: {
    type: Array,
    required: true,
    validator: value => value.length === 3,
  },
});

const cards = ref([]);

const getdishList = async (specialid) => {
  let result = await dishidListService(specialid);
  try{
    if (result.success === 1) {
      cards.value = cards.value.concat(result.data);
    } else {
      ElMessage.error('获取菜品信息失败');
    }
  } catch (e) {
    console.log(e);
  }
}

const  order = () => {
  const url = `/preorder`;
  window.open(url, '_blank');
}

onMounted(() => {
  for (let specialid of props.cardinfom){
    getdishList(specialid);
  }
})

</script>

<style scoped>
.main-card {
  border-radius: 10px;
}

.main-content {
  margin-bottom: 20px;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.text-section {
  padding: 20px;
}

.main-text {
  font-size: 2em;
  font-weight: bold;
}

.description {
  font-size: 1.2em;
  color: #555;
}

.card-container {
  margin-top: 20px;
}

.dish-card {
  border-radius: 10px;
  transition: transform 0.3s;
}

.dish-card:hover {
  transform: scale(1.05);
}

.card-header {
  font-size: 1.2em;
  font-weight: bold;
}

.card-content {
  display: flex;
  align-items: center;
}

.card-image {
  width: 150px;
  height: 150px;
  margin-right: 20px;
  object-fit: cover;
  border-radius: 10px;
}

.card-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-name {
  font-size: 1.5em;
  font-weight: bold;
}

.card-describe {
  margin-top: 10px;
  color: #666;
}

.card-footer {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-footer span {
  font-size: 1.2em;
  color: #333;
}

.order-button {
  font-size: 1em;
  border-radius: 5px;
}
</style>
