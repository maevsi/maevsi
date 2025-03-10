export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore()
  const localePath = useLocalePath()

  if (store.routeHistoryDisabled) return
  if (
    localePath({ path: from.path, hash: from.hash, query: from.query }) ===
    localePath({ path: to.path, hash: to.hash, query: to.query })
  )
    return

  store.routeHistory.push(from.fullPath)
})
