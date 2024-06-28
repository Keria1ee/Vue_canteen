<script setup>
import { ref } from 'vue'
import {onMounted} from "vue"
import card from '@/components/canteenlist.vue'
import {canteenListService,dishidListService} from'@/api/canteen.js'
import {ElMessage} from "element-plus";
import {useTokenStore} from "@/stores/token.js";

const canteenList = ref([])
const getCanteenList = async () => {
  let result = await canteenListService();

  if (result.success === 1) {
    canteenList.value = result.data;
  } else {
    ElMessage.error('获取食堂信息失败');
  }
}
onMounted(() => {
  getCanteenList();
})
</script>


<template>
  <div>
    <h1>食堂列表</h1>
    <div v-if="canteenList.length > 0">
      <card
          v-for="canteen in canteenList"
          :key="canteen.id"
          :imageSrcs="[canteen.image]"
      :mainText="canteen.name"
      :description="canteen.introduction"
          :cardinfom="[canteen.special1, canteen.special2, canteen.special3]"
      />
    </div>
    <div v-else>
      <p>暂无食堂信息</p>
    </div>
  </div>
</template>