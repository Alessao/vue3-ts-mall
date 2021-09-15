<template>
  <div class="menu">
    <page-content
      :contentTableConfig="contentTableConfig"
      :pageName="'Menu'"
    ></page-content>
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
  name: 'menu',
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
