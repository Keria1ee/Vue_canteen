<template>
  <el-card shadow="hover">
    <el-main>
      <el-row :gutter="20" class="main-content">
        <el-col :span="6">
          <el-carousel :interval="4000" height="400px" >
            <el-carousel-item v-for="(src, index) in imageSrcs" :key="index">
              <img :src="src" alt="Image" class="main-image" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="18">
          <h2>{{ mainText }}</h2>
          <p>{{ description }}</p>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="card-container">
        <el-col :span="8" v-for="card in cards" :key="card.id">
          <el-card shadow="hover">
            <template #header>
              <div>
                <span>{{ card.dishname }}</span>
              </div>
            </template>
            <span>{{card.describe}}</span>
            <el-button type="primary"@click="order">购买</el-button>
            <template #footer>
              <span>价格:{{card.price}}</span>
              </template>
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
.main-content {
  margin-bottom: 20px;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-container {
  margin-top: 20px;
}

.el-card {
  text-align: center;
}
</style>
