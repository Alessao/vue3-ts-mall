<template>
  <div class="base-echarts">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults } from 'vue'
import * as echarts from 'echarts'
import { EchartsOption } from 'echarts'
const props = withDefaults(
  defineProps<{
    options: EchartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)
const echartDivRef = ref()
onMounted(() => {
  const echartInstance = echarts.init(echartDivRef.value)
  echartInstance.setOption(props.options)
})
</script>

<style scoped></style>
