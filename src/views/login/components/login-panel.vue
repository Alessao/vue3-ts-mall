<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs v-model="activeName" stretch type="border-card">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" @click="handleLogin" class="login-btn"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginPhone from './login-phone.vue'
import LoginAccount from './login-account.vue'
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    const activeName = ref('account')
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const handleLogin = () => {
      if (activeName.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else if (activeName.value === 'phone') {
        phoneRef.value?.loginAction()
      }
    }
    return {
      isKeepPassword,
      handleLogin,
      accountRef,
      phoneRef,
      activeName
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-top: -100px;
  width: 320px;
  .title {
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
