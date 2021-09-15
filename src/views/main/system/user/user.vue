<template>
  <div class="user">
    <div class="search">
      <page-search
        :formConfig="formConfig"
        @handleResetBtn="handleResetBtn"
        @handleSearchBtn="handleSearchBtn"
      />
      <page-content
        ref="pageContentRef"
        :pageName="'Users'"
        :contentTableConfig="contentTableConfig"
        @handleAdd="handleAdd"
        @handleEdit="handleEdit"
      >
        <template #status="scope">
          <el-button
            plain
            size="mini"
            :type="scope.row.enable ? 'success' : 'danger'"
            >{{ scope.row.enable === 1 ? '启用' : '禁用' }}</el-button
          >
        </template>
      </page-content>
      <page-model
        :defaultInfo="defaultInfo"
        ref="pageModelRef"
        :modelConfig="modelConfig"
        :title="'新增用户'"
      ></page-model>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { formConfig } from './config/search.config'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'
import { contentTableConfig } from './config/content.config'
import { userPageSearch } from '@/hooks/userPageSearch'
import { usePageModel } from '@/hooks/use-page-model'
import { modelConfig } from './config/model.config'

// import HyForm from '@/base-ui/form'

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModel
    // HyForm
  },
  setup() {
    const [pageContentRef, handleResetBtn, handleSearchBtn] = userPageSearch()
    const newCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }
    const store = useStore()
    const departmentItem = modelConfig.formItems.find(
      (item) => item.field === 'departmentId'
    )
    departmentItem!.options = store.state.entireDepartment.map((item: any) => {
      return { title: item.name, value: item.id }
    })
    const [pageModelRef, defaultInfo, handleAdd, handleEdit] = usePageModel(
      newCallback,
      editCallback
    )
    return {
      formConfig,
      contentTableConfig,
      handleSearchBtn,
      handleResetBtn,
      pageContentRef,
      modelConfig,
      handleEdit,
      handleAdd,
      pageModelRef,
      defaultInfo
    }
  }
})
</script>

<style scoped lang="less"></style>
