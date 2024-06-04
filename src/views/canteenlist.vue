<template>
  <el-card shadow="hover" >
    <el-main>
      <el-row :gutter="20" class="main-content">
        <el-col :span="6">
          <el-carousel :interval="4000" height="200px">
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
        <el-col :span="8" v-for="(card, index) in cards" :key="index">
          <el-card shadow="hover" >
            <template #header>
              <div>
                <span>{{ card.name }}</span>
              </div>
            </template>
            <p>{{ card.intro }}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-card>
</template>

<script setup>
import { defineProps } from 'vue';
import { ElCard, ElMain, ElRow, ElCol, ElCarousel, ElCarouselItem } from 'element-plus';

// 定义传入的props
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
  cards: {
    type: Array,
    required: true,
    validator: value => {
      return value.every(card => 'name' in card && 'intro' in card);
    },
  },
});
</script>

<style scoped>

.main-content {
  margin-bottom: 20px;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 或者使用 cover */
}

.card-container {
  margin-top: 20px;
}

.el-card {
  text-align: center;
}
</style>
