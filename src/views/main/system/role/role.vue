<template>
  <div class="role">
    <page-search :formConfig="formConfig" />
    <page-content
      :pageName="'Role'"
      :contentTableConfig="contentTableConfig"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
import { formConfig } from './config/search.config'

export default defineComponent({
  components: {
    PageContent,
    PageSearch
  },
  name: 'role',
  setup() {
    return {
      contentTableConfig,
      formConfig
    }
  }
})
</script>

<style scoped></style>
