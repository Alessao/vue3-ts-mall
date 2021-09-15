<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量(饼图)"></hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销量"></hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量(玫瑰图)"></hy-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <hy-card title="分类商品销量">
          <base-echart></base-echart>
        </hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品收藏"></hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import BaseEchart from '@/base-ui/echart'
import HyCard from '@/base-ui/card'
export default defineComponent({
  components: {
    HyCard,
    BaseEchart
  },
  name: 'dashboard',
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboadDataAction')
    return {}
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
