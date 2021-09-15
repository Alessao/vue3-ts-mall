import { useStore } from '@/store/main'
export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`

  return !!permissions.find((item) => {
    return item === verifyPermission
  })
}