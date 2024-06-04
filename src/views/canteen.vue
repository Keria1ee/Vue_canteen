<script setup>
import { ref } from 'vue'
import {onMounted} from "vue"
import card from '@/components/canteenlist.vue'
import {canteenListService} from'@/api/canteen.js'

const canteenList = ref([])
const getCanteenList = async () => {
  let result = await canteenListService();
  canteenList.value = result.data;
}

onMounted(() => {
  getCanteenList();
})
</script>

<template>
</template>