<template>
  <div class="page-content">
    <hy-table
      :listData="listData"
      v-bind="contentTableConfig"
      :listCount="listCount"
      v-model:page="pageInfo"
    >
      <!-- @selectionChange="handleSelectionChange" -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          @click="handleNewClick"
          plain
          type="primary"
          size="mini"
          >新增</el-button
        >
        <!-- <el-button icon="el-icon-refresh" type="mini">新建用户</el-button> -->
      </template>
      <!-- <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable === 1 ? '启用' : '禁用' }}</el-button
        >
      </template> -->
      <template #createAt="scope">
        <strong>{{ $filters.formatDate(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatDate(scope.row.updateAt) }}</strong>
      </template>
      <template #handle="scope">
        <div class="handle-btns">
          <el-button
            @click="handleEdit(scope.row)"
            v-if="isUpdate"
            icon="el-icon-edit"
            size="mini"
            type="text"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="el-icon-delete"
            size="mini"
            type="text"
            >删除</el-button
          >
        </div>
      </template>
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import HyTable from '@/base-ui/table'
import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
  components: {
    HyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    },
    pageDataType: {
      type: Object,
      require: true
    }
  },
  emits: ['handleAdd', 'handleEdit'],
  setup(props, { emit }) {
    const store = useStore()

    const isCreate = usePermission(
      props.pageName?.toLowerCase() as string,
      'create'
    )
    const isUpdate = usePermission(
      props.pageName?.toLowerCase() as string,
      'update'
    )
    const isDelete = usePermission(
      props.pageName?.toLowerCase() as string,
      'delete'
    )
    const isQuery = usePermission(
      props.pageName?.toLowerCase() as string,
      'query'
    )
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())
    const getPageData = (queryInfo: any = {}) => {
      console.log(isQuery)

      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    const listData = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const listCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )
    const handleEdit = (row: any) => {
      emit('handleEdit', row)
    }
    const handleNewClick = () => {
      emit('handleAdd')
    }

    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        // if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handle') return false
        return true
      }
    )

    return {
      listData,
      listCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleEdit,
      handleNewClick
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
