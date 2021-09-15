<template>
  <div class="nav-header">
    <i
      class="fold"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <div>
        <hy-breadcrumb :breadcrumbs="breadcrumbs" />
      </div>
      <div>
        <user-info />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import HyBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    UserInfo,
    HyBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(true)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })
    // console.log(breadcrumbs.value)

    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }
}
</style>
