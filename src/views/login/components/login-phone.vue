<template>
  <div class="login-phone">
    <el-form :model="phone" label-width="80px" ref="formRef" :rules="rules">
      <el-form-item class="is-required" label="手机号" prop="number">
        <el-input v-model="phone.number"></el-input>
      </el-form-item>
      <el-form-item class="is-required" label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code"></el-input>
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/phone-config'
import { ElForm } from 'element-plus'
import store from '@/store/main/index'
export default defineComponent({
  setup() {
    const phone = reactive({
      number: '',
      code: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('phoneLogin')
          store.dispatch('login/phoneLoginAction', { ...phone })
        }
      })
    }
    return {
      phone,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}
.get-btn {
  margin-left: 8px;
}
</style>
