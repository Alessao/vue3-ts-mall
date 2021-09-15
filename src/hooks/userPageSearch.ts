import PageContent from '@/components/page-content'
import { ref } from 'vue'
export function userPageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleSearchBtn = (queryInfo: any) => {
    console.log(queryInfo)

    pageContentRef.value?.getPageData(queryInfo)
  }
  const handleResetBtn = () => {
    pageContentRef.value?.getPageData()
  }

  return [pageContentRef, handleResetBtn, handleSearchBtn]
}
