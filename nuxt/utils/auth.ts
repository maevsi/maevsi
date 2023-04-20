import { IncomingMessage, ServerResponse } from 'node:http'

import { Client } from '@urql/vue'
import { consola } from 'consola'
import { parse, serialize } from 'cookie'
import { decodeJwt } from 'jose'

import { JWT_NAME } from './constants'
import { useMaevsiStore } from '~/store'
import { authenticateMutation } from '~/gql/documents/mutations/account/accountAuthenticate'
import { jwtRefreshMutation } from '~/gql/documents/mutations/account/accountJwtRefresh'

export const authenticationAnonymous = async ({
  client,
  $urqlReset,
  store,
  res,
}: {
  client: Client
  $urqlReset: () => void
  store: ReturnType<typeof useMaevsiStore>
  res: ServerResponse
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
      store,
      res,
      jwt: result.data.authenticate.jwt,
    })
  }
}

export const getJwtFromCookie = ({ req }: { req: IncomingMessage }) => {
  if (!req.headers.cookie) {
    return consola.debug('No cookie header.')
  }

  const cookies = parse(req.headers.cookie)
  const jwtName = JWT_NAME()

  if (!cookies[jwtName]) {
    return consola.debug('No token cookie.')
  }

  const cookie = decodeJwt(cookies[jwtName])

  if (cookie.exp === undefined || cookie.exp <= Date.now() / 1000) {
    return consola.info('Token expired.')
  }

  return {
    jwt: cookies[jwtName],
    jwtDecoded: cookie,
  }
}

export const jwtRefresh = async ({
  client,
  $urqlReset,
  store,
  res,
  id,
}: {
  client: Client
  $urqlReset: () => void
  store: ReturnType<typeof useMaevsiStore>
  res: ServerResponse
  id: string
}) => {
  consola.trace('Refreshing a JWT...')

  const result = await client.mutation(jwtRefreshMutation, { id }).toPromise()

  if (result.error) {
    consola.error(result.error)
    await signOut({ $urqlReset, store, res })
  } else if (!result.data?.jwtRefresh?.jwt) {
    await authenticationAnonymous({ client, $urqlReset, store, res })
  } else {
    await jwtStore({ $urqlReset, store, res, jwt: result.data.jwtRefresh.jwt })
  }
}

export const jwtStore = async ({
  $urqlReset,
  store,
  res,
  jwt,
}: {
  $urqlReset: () => void
  store: ReturnType<typeof useMaevsiStore>
  res?: ServerResponse
  jwt?: string
}) => {
  $urqlReset()

  consola.trace('Storing the following JWT: ' + jwt)
  store.jwtSet(jwt)

  if (process.server) {
    res?.setHeader(
      'Set-Cookie',
      serialize(JWT_NAME(), jwt || '', {
        expires: jwt ? new Date(Date.now() + 86400 * 1000 * 31) : new Date(0),
        httpOnly: true,
        path: '/',
        sameSite: 'lax', // Cannot be 'strict' to allow authentications after clicking on links within webmailers.
        secure: true,
      })
    )
  } else {
    try {
      await $fetch('/api/auth', {
        method: 'POST',
        ...(jwt ? { headers: { Authorization: `Bearer ${jwt}` } } : {}),
      })
    } catch (error: any) {
      return Promise.reject(Error('Authentication api call failed.'))
    }
  }
}

export const useJwtStore = () => {
  const { $urqlReset } = useNuxtApp()
  const store = useMaevsiStore()
  const event = useRequestEvent()

  return {
    async jwtStore(jwt?: string) {
      await jwtStore({
        $urqlReset,
        store,
        res: process.server ? event.node.res : undefined,
        jwt,
      })
    },
  }
}

export const signOut = async ({
  $urqlReset,
  store,
  res,
}: {
  $urqlReset: () => void
  store: ReturnType<typeof useMaevsiStore>
  res?: ServerResponse
}) => {
  await jwtStore({ $urqlReset, store, res })
}

export const useSignOut = () => {
  const { $urqlReset } = useNuxtApp()
  const store = useMaevsiStore()
  const event = useRequestEvent()

  return {
    async signOut() {
      await signOut({
        $urqlReset,
        store,
        res: process.server ? event.node.res : undefined,
      })
    },
  }
}
