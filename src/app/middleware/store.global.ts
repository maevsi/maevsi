export default defineNuxtRouteMiddleware((to, from) => {
  const store = useMaevsiStore()
  const localePath = useLocalePath()

  if (store.routeHistoryDisabled) return
  if (localePath(from.fullPath) === localePath(to.fullPath)) return

  store.routeHistory.push(from.fullPath)
})
