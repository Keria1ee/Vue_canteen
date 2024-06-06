<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" class="change-password-form">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input type="password" v-model="form.oldPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input type="password" v-model="form.newPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="confirmPassword">
      <el-input type="password" v-model="form.confirmPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">修改密码</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import {useTokenStore} from "@/stores/token.js";
import {rePasswordService} from "@/api/user.js";
import router from "@/router/index.js";
const formRef = ref(null);

const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const rules = {
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: (rule, value, callback) => {
        if (value !== form.newPassword) {
          callback(new Error('两次输入的新密码不一致'));
        } else {
          callback();
        }
      }, trigger: 'blur' },
  ],
};

const submitForm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      const email = useTokenStore().getData().email
      const payload = {
        email,
        password: form.oldPassword,
        new_password: form.newPassword,
      };
      let result = await rePasswordService(payload);
      if (result.success === 1) {
        ElMessage.success('修改密码成功');
        useTokenStore().removeToken();
        await router.push('/login');
      } else {
        ElMessage.error(result.message);
      }
    } else {
      ElMessage.error('两次输入的新密码不一致');
      return false;
    }
  });
};

const resetForm = () => {
  formRef.value.resetFields();
};
</script>

<style scoped>
.change-password-form {
  max-width: 400px;
  margin: 50px auto;
}
</style>
