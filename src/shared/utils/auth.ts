import type { Client } from '@urql/vue'
import { consola } from 'consola'
import type { H3Event } from 'h3'
import { decodeJwt } from 'jose'

import type { CookieRef } from '#app'

import { authenticateMutation } from '~~/gql/documents/mutations/account/accountAuthenticate'
import { jwtRefreshMutation } from '~~/gql/documents/mutations/account/accountJwtRefresh'
import { setJwtCookie } from '~~/server/utils/jwt'

export const authenticationAnonymous = async ({
  $urqlReset,
  client,
  event,
  runtimeConfig,
  store,
}: {
  $urqlReset: () => Client
  client: Client
  event?: H3Event
  runtimeConfig: ReturnType<typeof useRuntimeConfig>
  store: ReturnType<typeof useStore>
}) => {
  consola.trace('Authenticating anonymously...')

  const result = await client
    .mutation(authenticateMutation, {
      username: '',
      password: '',
    })
    .toPromise()

  if (result.error) {
    consola.error(result.error)
  } else {
    if (!result.data?.authenticate) {
      return
    }

    await jwtStore({
      $urqlReset,
      event,
      jwt: result.data.authenticate.jwt,
      runtimeConfig,
      store,
    })
  }
}

export const getJwtFromCookie = ({
  cookie,
}: {
  cookie: CookieRef<string | null | undefined>
}) => {
  if (!cookie.value) {
    consola.debug('No token cookie.')
    return
  }

  const jwt = decodeJwt(cookie.value)

  if (jwt.exp === undefined || jwt.exp <= Date.now() / 1000) {
    consola.info('Token expired.')
    return
  }

  return {
    jwt: cookie.value,
    jwtDecoded: jwt,
  }
}

export const jwtRefresh = async ({
  $urqlReset,
  client,
  event,
  id,
  runtimeConfig,
  store,
}: {
  $urqlReset: () => Client
  client: Client
  event?: H3Event
  id: string
  runtimeConfig: ReturnType<typeof useRuntimeConfig>
  store: ReturnType<typeof useStore>
}) => {
  consola.trace('Refreshing a JWT...')

  const result = await client.mutation(jwtRefreshMutation, { id }).toPromise()

  if (result.error) {
    consola.error(result.error)
    await signOut({
      $urqlReset,
      client,
      event,
      runtimeConfig,
      store,
    })
  } else if (!result.data?.jwtRefresh?.jwt) {
    await authenticationAnonymous({
      $urqlReset,
      client,
      event,
      runtimeConfig,
      store,
    })
  } else {
    await jwtStore({
      $urqlReset,
      event,
      jwt: result.data.jwtRefresh.jwt,
      runtimeConfig,
      store,
    })
  }
}

export const jwtStore = async ({
  $urqlReset,
  event,
  jwt,
  runtimeConfig,
  store,
}: {
  $urqlReset: () => Client
  event?: H3Event
  jwt?: string
  runtimeConfig: ReturnType<typeof useRuntimeConfig>
  store: ReturnType<typeof useStore>
}) => {
  $urqlReset()

  consola.trace('Storing the following JWT: ' + jwt)
  store.jwtSet(jwt)

  if (event) {
    setJwtCookie({ event, jwt: jwt || '', runtimeConfig })
  } else {
    try {
      await $fetch('/api/auth', {
        method: 'POST',
        ...(jwt ? { headers: { Authorization: `Bearer ${jwt}` } } : {}),
      })
    } catch (error) {
      console.error(error)
      return Promise.reject(Error('Authentication api call failed.'))
    }
  }
}

export const signOut = async ({
  $urqlReset,
  client,
  event,
  runtimeConfig,
  store,
}: {
  $urqlReset: () => Client
  client: Client
  event?: H3Event
  runtimeConfig: ReturnType<typeof useRuntimeConfig>
  store: ReturnType<typeof useStore>
}) => {
  await jwtStore({ $urqlReset, event, runtimeConfig, store })
  await authenticationAnonymous({
    $urqlReset,
    client,
    event,
    runtimeConfig,
    store,
  })
}
