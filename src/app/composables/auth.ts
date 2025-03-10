export const useAuth = async () => {
  const jwtFromCookie = useJwtFromCookie()
  const authenticateAnonymous = useAuthenticateAnonymous()
  const jwtRefresh = useJwtRefresh()

  if (import.meta.server) {
    if (jwtFromCookie?.jwtDecoded?.id) {
      await jwtRefresh()
    } else {
      await authenticateAnonymous()
    }
  }
}

export const useAuthenticateAnonymous = () => {
  const { $urql, $urqlReset, ssrContext } = useNuxtApp()
  const runtimeConfig = useRuntimeConfig()
  const store = useStore()

  return async () =>
    await authenticationAnonymous({
      $urqlReset,
      client: $urql.value,
      event: ssrContext?.event,
      runtimeConfig,
      store,
    })
}

export const useCookieJwt = () => {
  const { siteUrlTyped } = useSiteUrl()

  const jwtName = JWT_NAME({ isHttps: siteUrlTyped.protocol === 'https:' })
  return useCookie(jwtName)
}

export const useJwtFromCookie = () => {
  const cookie = useCookieJwt()

  return getJwtFromCookie({ cookie })
}

export const useJwtRefresh = () => {
  const { $urql, $urqlReset, ssrContext } = useNuxtApp()
  const jwtFromCookie = useJwtFromCookie()
  const runtimeConfig = useRuntimeConfig()
  const store = useStore()

  return async () =>
    await jwtRefresh({
      $urqlReset,
      client: $urql.value,
      event: ssrContext?.event,
      id: jwtFromCookie?.jwtDecoded.id as string,
      runtimeConfig,
      store,
    })
}

export const useJwtStore = async () => {
  const { $urqlReset, ssrContext } = useNuxtApp()
  const store = useStore()
  const runtimeConfig = useRuntimeConfig()

  return {
    async jwtStore(jwt?: string) {
      await jwtStore({
        $urqlReset,
        event: ssrContext?.event,
        jwt,
        runtimeConfig,
        store,
      })
    },
  }
}

export const useSignOut = async () => {
  const { $urql, $urqlReset, ssrContext } = useNuxtApp()
  const store = useStore()
  const runtimeConfig = useRuntimeConfig()

  return {
    async signOut() {
      await signOut({
        $urqlReset,
        client: $urql.value,
        event: ssrContext?.event,
        runtimeConfig,
        store,
      })
    },
  }
}
