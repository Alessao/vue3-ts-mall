import { ref } from 'vue'
import PageModel from '@/components/page-model'
type CallbackFn = () => void
export function usePageModel(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModelRef = ref<InstanceType<typeof PageModel>>()
  const defaultInfo = ref({})
  const handleAdd = () => {
    if (pageModelRef.value) {
      defaultInfo.value = {}
      pageModelRef.value.dialogVisible = true
    }
    newCb && newCb()
  }

  const handleEdit = (row: any) => {
    defaultInfo.value = { ...row }
    // console.log(defaultInfo)

    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    editCb && editCb()
  }
  return [pageModelRef, defaultInfo, handleAdd, handleEdit]
}
