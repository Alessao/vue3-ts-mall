<template>
  <div class="page-search">
    <hyForm v-bind="formConfig" v-model="formData">
      <template #header>
        <div>高级检索</div>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleReset" size="small" icon="el-icon-refresh"
            >重置</el-button
          >
          <el-button
            @click="handleSearch"
            size="small"
            type="primary"
            icon="el-icon-search"
            >查询</el-button
          >
        </div>
      </template>
    </hyForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'
export default defineComponent({
  props: {
    formConfig: {
      type: Object,
      require: true
    }
  },
  components: {
    HyForm
  },
  emits: ['handleResetBtn', 'handleSearchBtn'],
  setup(props, { emit }) {
    const formItems = props.formConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    const handleReset = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      emit('handleResetBtn')
    }
    const handleSearch = () => {
      emit('handleSearchBtn', formData.value)
    }
    return {
      formData,
      handleSearch,
      handleReset
    }
  }
})
</script>

<style scoped lang="less">
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
