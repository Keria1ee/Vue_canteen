<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import {userRegisterService , userLoginService} from '@/api/user.js'
import {ElMessage} from "element-plus";
import {useRouter} from 'vue-router'
import {useTokenStore} from "@/stores/token.js";
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
const router = useRouter()
const tokenStore = useTokenStore()
const registerdata = ref({
  email: '',
  password: '',
  name: '',
  repassword: ''
})

//验证两次密码是否一致
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerdata.value.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const rules = {
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min : 2, max: 20, message: '名称长度在 2 到 20 个字符', trigger: 'blur'}
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { min : 6, max: 20, message: '用户名长度在 6 到 20 个字符', trigger: 'blur'}
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min : 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur'}
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ]
}




const register = async () => {
  try {
    let result = await userRegisterService(registerdata.value);
    if (result.success === 20) {
      ElMessage.success('注册成功');
      isRegister.value = false;
      await router.push('/login');
    } else {
      // 假设 result.message 包含错误信息
      ElMessage.error('注册失败');
    }
  } catch (error) {
    // 处理请求失败的情况
    ElMessage.error(error.message || '请求失败');
  }
};


const login =async () => {
  let reslut = await userLoginService(registerdata.value)
  ElMessage.success('登录成功')
  tokenStore.setToken(reslut.data.token)
   await router.push('/')
}

//清空数据模型
const clear = () => {
  registerdata.value = {
    email: '',
    password: '',
    name: '',
    repassword: ''
  }
}

</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerdata" :rules="rules">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="name">
          <el-input :prefix-icon="User" placeholder="请输入名称" v-model="registerdata.name" ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerdata.email" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerdata.password"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerdata.repassword"></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="register">
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false;clear()">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-else :model="registerdata" :rules="rules">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="email">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerdata.email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerdata.password"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true;clear()">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: url('../assets/hit.png') no-repeat 50% center / 240px auto,
    url('../assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>