<template>
  <div class="department">
    <page-content
      :contentTableConfig="contentTableConfig"
      :pageName="'Department'"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentTableConfig } from './config/content.config'
import PageContent from '@/components/page-content'

export default defineComponent({
  components: {
    PageContent
  },
  name: 'department',
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
