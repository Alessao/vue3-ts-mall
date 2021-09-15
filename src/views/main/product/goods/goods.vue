<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" :pageName="'Goods'">
      <template #image="scope">
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.status ? 'success' : 'danger'"
          >{{ scope.row.status === 1 ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #oldPrice="scope">
        <span>{{ `￥${scope.row.oldPrice}` }}</span>
      </template>
      <template #newPrice="scope">
        <span>{{ `￥${scope.row.newPrice}` }}</span>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  components: {
    PageContent
  },
  name: 'goods',
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
