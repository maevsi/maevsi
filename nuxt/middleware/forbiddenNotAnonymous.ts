import { useMaevsiStore } from '~/store'

export default defineNuxtRouteMiddleware(() => {
  const store = useMaevsiStore()

  if (store.jwtDecoded.value?.role === 'maevsi_anonymous') return

  return abortNavigation({ statusCode: 403 })
})
