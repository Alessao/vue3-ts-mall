<template>
  <div class="page-model">
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <div>
        <hy-form v-bind="modelConfig" v-model="formData"></hy-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import HyForm from '@/base-ui/form'

export default defineComponent({
  components: {
    HyForm
  },
  props: {
    modelConfig: {
      type: Object,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    watch(
      () => props.defaultInfo,
      (newValue) => {
        // console.log(1)
        for (const item of props.modelConfig?.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
        console.log(formData)
      }
    )

    return {
      dialogVisible,
      formData
    }
  }
})
</script>

<style scoped></style>
