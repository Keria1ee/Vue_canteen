<template>
  <el-card class="comment-card" shadow="hover">
    <div class="card-header">
      <div class="user-info">
        <el-avatar :src="avatarUrl" class="avatar" />
        <span class="username">用户ID：{{ username }}</span>
      </div>
      <span class="dish-name">{{ dishName }}</span>
    </div>
    <div class="card-body">
      <p>{{ comment }}</p>
    </div>
    <div class="card-footer">
      <el-rate :model-value="rating" :max="5" disabled show-score @change="handleRatingChange"></el-rate>
      <span class="comment-time">{{ commentTime }}</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "CommentCard",
  props: {
    avatarUrl: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: true
    },
    dishName: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    commentTime: {
      type: String,
      required: true
    }
  },
  methods: {
    handleRatingChange(newRating) {
      this.$emit('update:rating', newRating);
    }
  }
};
</script>

<style scoped>
.comment-card {
  width: 100%;
  margin: 16px auto;
  padding: 0 16px;
  box-sizing: border-box;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.user-info {
  display: flex;
  align-items: center;
}
.avatar {
  margin-right: 12px;
}
.username {
  font-weight: bold;
  font-size: 1.1em;
}
.dish-name {
  font-weight: bold;
  font-size: 1em;
}
.card-body {
  text-align: left;
  margin-bottom: 12px;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-footer .el-rate {
  flex: 1;
  text-align: left;
}
.card-footer .comment-time {
  flex: 1;
  text-align: right;
  color: #909399;
}
</style>
