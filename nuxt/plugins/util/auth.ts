import { IncomingMessage, ServerResponse } from 'node:http'

import { Client } from '@urql/vue'
import consola from 'consola'
import { parse, serialize } from 'cookie'
import { decodeJwt } from 'jose'
import { Store } from 'pinia'

import { useNuxtApp, useRequestEvent } from '#app'

import { JWT_NAME } from './constants'
import { xhrPromise } from './util'
import AUTHENTICATE_MUTATION from '~/gql/mutation/account/accountAuthenticate.gql'
import JWT_REFRESH_MUTATION from '~/gql/mutation/account/accountJwtRefresh.gql'
import { useMaevsiStore } from '~/store'

export async function authenticationAnonymous(
  client: Client,
  $urqlReset: () => void,
  store: Store,
  res: ServerResponse
) {
  consola.trace('Authenticating anonymously...')

  const result = await client
    .mutation(AUTHENTICATE_MUTATION, {
      username: '',
      password: '',
    })
    .toPromise()

  if (result.error) {
    consola.error(result.error)
  } else {
    if (!result.data.authenticate) {
      return
    }

    await jwtStore($urqlReset, store, res, result.data.authenticate.jwt)
  }
}

export function useAuthenticationAnonymous() {
  const { $urql, $urqlReset } = useNuxtApp()
  const store = useMaevsiStore()
  const event = useRequestEvent()

  return {
    async authenticationAnonymous() {
      await authenticationAnonymous($urql.value, $urqlReset, store, event.res)
    },
  }
}

export function jwtFromCookie(req: IncomingMessage) {
  if (req.headers.cookie) {
    const cookies = parse(req.headers.cookie)

    if (cookies[JWT_NAME]) {
      const cookie = decodeJwt(cookies[JWT_NAME])

      if (cookie.exp !== undefined && cookie.exp > Date.now() / 1000) {
        return {
          jwt: cookies[JWT_NAME],
          jwtDecoded: cookie,
        }
      } else {
        consola.info('Token expired.')
      }
    } else {
      consola.debug('No token cookie.')
    }
  } else {
    consola.debug('No cookie header.')
  }
}

export function useJwtFromCookie() {
  const event = useRequestEvent()

  return {
    jwtFromCookie() {
      jwtFromCookie(event.req)
    },
  }
}

export async function jwtRefresh(
  client: Client,
  $urqlReset: () => void,
  store: Store,
  res: ServerResponse,
  id: string
) {
  consola.trace('Refreshing a JWT...')

  const result = await client.mutation(JWT_REFRESH_MUTATION, { id }).toPromise()

  if (result.error) {
    consola.error(result.error)
    await signOut($urqlReset, store, res)
  } else if (!result.data.jwtRefresh.jwt) {
    await authenticationAnonymous(client, $urqlReset, store, res)
  } else {
    await jwtStore($urqlReset, store, res, result.data.jwtRefresh.jwt)
  }
}

export function useJwtRefresh() {
  const { $urql, $urqlReset } = useNuxtApp()
  const store = useMaevsiStore()
  const event = useRequestEvent()

  return {
    async jwtRefresh(id: string) {
      await jwtRefresh($urql.value, $urqlReset, store, event.res, id)
    },
  }
}

export async function jwtStore(
  $urqlReset: () => void,
  store: Store,
  res: ServerResponse | undefined,
  jwt: string | undefined,
  callback = () => {
    window.location.reload()
  }
) {
  $urqlReset()

  consola.trace('Storing the following JWT: ' + jwt)
  ;(store as unknown as { jwtSet: (jwtNew?: string) => void }).jwtSet(jwt)

  if (process.server) {
    res?.setHeader(
      'Set-Cookie',
      serialize(JWT_NAME, jwt || '', {
        expires: jwt ? new Date(Date.now() + 86400 * 1000 * 31) : new Date(0),
        httpOnly: true,
        path: '/',
        sameSite: 'lax', // Cannot be 'strict' to allow authentications after clicking on links within webmailers.
        secure: true,
      })
    )
  } else {
    try {
      await xhrPromise('POST', '/api/auth', jwt || '')
    } catch (error: any) {
      return Promise.reject(Error('Authentication api call failed.'))
    }

    callback() // TODO: Move callback to caller.
  }
}

export function useJwtStore() {
  const { $urqlReset } = useNuxtApp()
  const store = useMaevsiStore()
  const event = useRequestEvent()

  return {
    async jwtStore(jwt: string | undefined, callback?: () => void) {
      await jwtStore(
        $urqlReset,
        store,
        process.server ? event.res : undefined,
        jwt,
        callback
      )
    },
  }
}

export async function signOut(
  $urqlReset: () => void,
  store: Store,
  res: ServerResponse | undefined
) {
  await jwtStore($urqlReset, store, res, undefined)
}

export function useSignOut() {
  const { $urqlReset } = useNuxtApp()
  const store = useMaevsiStore()
  const event = useRequestEvent()

  return {
    async signOut() {
      await signOut($urqlReset, store, process.server ? event.res : undefined)
    },
  }
}
