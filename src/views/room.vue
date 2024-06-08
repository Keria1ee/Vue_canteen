<template>
  <el-container class="comment-container">
    <el-header v-if="!adding" style="text-align: right;">
      <el-button type="primary" @click="toggleAdding">添加评论</el-button>
    </el-header>
    <el-main v-if="!adding">
      <div class="filter-container" style="text-align: left;">
        <el-select v-model="selectedDishFilter" placeholder="筛选菜品" clearable @clear="clearFilter">
          <el-option
              v-for="dish in dishes"
              :key="dish.id"
              :label="dish.dishname"
              :value="dish.dishname"
          />
        </el-select>
      </div>
      <el-empty v-if="filteredComments.length === 0" description="No comments yet." />
      <div class="comment-list">
        <comment-card
            v-for="comment in paginatedComments"
            :key="comment.cid"
            :avatar-url="comment.avatarUrl"
            :username="comment.uid"
            :dish-name="comment.dishname"
            :comment="comment.comment"
            :rating="comment.rating"
            :comment-time="comment.time"
        />
        <el-pagination
            layout="prev, pager, next"
            :total="filteredComments.length"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handlePageChange"
        />
      </div>
    </el-main>
    <el-main v-if="adding">
      <!-- 提交评论的界面 -->
      <el-form :model="commentForm" label-width="80px">
        <el-form-item label="选择菜品">
          <el-select v-model="commentForm.selectedDish" placeholder="请选择菜品">
            <el-option
                v-for="dish in dishes"
                :key="dish.id"
                :label="dish.dishname"
                :value="dish.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="评分">
          <el-rate v-model="commentForm.rating"></el-rate>
        </el-form-item>
        <el-form-item label="评论内容">
          <el-input type="text" v-model="commentForm.comment" class="comment-input"></el-input>
        </el-form-item>
      </el-form>
      <div class="button-container">
        <el-button type="primary" @click="submitComment">提交评论</el-button>
        <el-button @click="toggleAdding">返回查看评论</el-button>
      </div>
    </el-main>
  </el-container>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import CommentCard from '@/components/commentcard.vue';
import { addComment, commentListService } from "@/api/comments.js";
import { ElMessage } from 'element-plus';
import { getDish, getDishList } from "@/api/orderlist.js";
import { useTokenStore } from "@/stores/token.js";

const uid = useTokenStore().getData().id;

const adding = ref(false); // 默认隐藏提交评论的界面
const comments = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const dishes = ref([]); // 菜品列表
const selectedDishFilter = ref(''); // 筛选的菜品名

const fetchComments = async () => {
  try {
    let result = await commentListService();
    if (result.success === 1) {
      comments.value = result.data;
      for (let i = 0; i < comments.value.length; i++) {
        comments.value[i].dishname = await getdishname(comments.value[i].dishid);
        comments.value[i].avatarUrl = 'src/assets/avatar.jpg';
      }
    } else {
      ElMessage.error('Failed to load comments.');
    }
  } catch (error) {
    ElMessage.error('An error occurred while fetching comments.');
  }
};

const getdishname = async (dishid) => {
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

const fetchDishes = async () => {
  try {
    let result = await getDishList();
    if (result.success === 1) {
      dishes.value = result.data;
    } else {
      console.error('Failed to load dishes.');
    }
  } catch (error) {
    console.error('An error occurred while fetching dishes:', error);
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

const filteredComments = computed(() => {
  if (selectedDishFilter.value) {
    return comments.value.filter(comment => comment.dishname === selectedDishFilter.value);
  }
  return comments.value;
});

const paginatedComments = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredComments.value.slice(start, end);
});

const toggleAdding = () => {
  adding.value = !adding.value; // 切换添加评论界面的显示状态
};

// 提交评论的相关逻辑
const commentForm = ref({
  selectedDish: '', // 选中的菜品
  rating: 0,
  comment: ''
});

const submitComment = async () => {
  const payload = ref({
    dishid: commentForm.value.selectedDish,
    uid: uid,
    rating: commentForm.value.rating,
    comment: commentForm.value.comment,
    time: formatDate(new Date())
  });
  console.log(payload);
  let result = await addComment(payload.value);
  if (result.success === 1) {
    ElMessage.success('评论成功');
    fetchComments();
    toggleAdding();
    selectedDishFilter.value = '';
  } else {
    ElMessage.error('评论失败');
  }
};

const formatDate = (date) => {
  const padZero = (num) => (num < 10 ? `0${num}` : num);

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // getMonth() 返回 0-11，需要 +1
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const clearFilter = () => {
  selectedDishFilter.value = '';
};

onMounted(() => {
  fetchComments();
  fetchDishes();
});
</script>


<style scoped>
.comment-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.comment-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-container {
  display: flex;
  justify-content: center;
}

.comment-input {
  min-height: 400px;
}
</style>