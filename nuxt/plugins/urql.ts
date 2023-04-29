import {
  createClient,
  ssrExchange,
  fetchExchange,
  ClientOptions,
} from '@urql/core'
// import type { Data } from '@urql/exchange-graphcache'
import { Cache, cacheExchange } from '@urql/exchange-graphcache'
import { relayPagination } from '@urql/exchange-graphcache/extras'
import { devtoolsExchange } from '@urql/devtools'
import { provideClient } from '@urql/vue'
import { consola } from 'consola'
import { ref } from 'vue'

import schema from '~/gql/generated/introspection'
import { GraphCacheConfig } from '~/gql/generated/graphcache'

import { useMaevsiStore } from '~/store'

const ssrKey = '__URQL_DATA__'
const invalidateCache = (
  cache: Cache,
  name: string,
  args?: { input: { id: any } }
) =>
  args
    ? cache.invalidate({ __typename: name, id: args.input.id })
    : cache
        .inspectFields('Query')
        .filter((field) => field.fieldName === name)
        .forEach((field) => {
          cache.invalidate('Query', field.fieldKey)
        })
// TODO: create manual updates that do not require invalidation (https://github.com/maevsi/maevsi/issues/720)
// const listPush = (cache: Cache, fieldName: string, data: Data | null) =>
//   cache
//     .inspectFields('Query')
//     .filter((field) => field.fieldName === fieldName)
//     .forEach((field) => {
//       const dataField = cache.resolve('Query', field.fieldKey)

//       if (typeof dataField !== 'string')
//         throw new Error('Data field is no string!')

//       const allInvitations = cache.resolve(dataField, 'nodes')

//       if (
//         !data ||
//         !Array.isArray(allInvitations) ||
//         !isNonEmptyArrayOfStrings(allInvitations)
//       )
//         throw new Error('Data field is no array!')

// // TODO: insert IDs, not data  (https://github.com/maevsi/maevsi/issues/720)
//       allInvitations.push(data)
//       cache.link('Query', field.fieldKey, allInvitations)
//     })

// const isNonEmptyArrayOfStrings = (value: unknown): value is (string | Data)[] => {
//   return Array.isArray(value) && value.every((item) => typeof item === 'string')
// }

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  const host = useHost()
  const ssr = ssrExchange({
    isClient: process.client,
  })

  if (process.client) {
    nuxtApp.hook('app:created', () => {
      ssr.restoreData(nuxtApp.payload[ssrKey])
    })
  }

  if (process.server) {
    nuxtApp.hook('app:rendered', () => {
      nuxtApp.payload[ssrKey] = ssr.extractData()
    })
  }

  const cacheConfig: GraphCacheConfig = {
    schema,
    resolvers: {
      Query: {
        allContacts: relayPagination(),
        allEvents: relayPagination(),
        allInvitations: relayPagination(),
        allUploads: relayPagination(),
      },
    },
    updates: {
      Mutation: {
        // create
        createContact: (_parent, _args, cache, _info) =>
          invalidateCache(cache, 'allContacts'),
        createInvitation: (_parent, _args, cache, _info) =>
          invalidateCache(cache, 'allInvitations'),
        // TODO: create manual updates that do not require invalidation (https://github.com/maevsi/maevsi/issues/720)
        // listPush(cache, 'allInvitations', parent.createInvitation),

        // update
        profilePictureSet: (_parent, _args, cache, _info) =>
          invalidateCache(cache, 'profilePictureByUsername'),

        // delete
        deleteContactById: (_parent, args, cache, _info) =>
          invalidateCache(cache, 'Contact', args),
        deleteInvitationById: (_parent, args, cache, _info) =>
          invalidateCache(cache, 'Invitation', args),
      },
    },
  }

  const cache = cacheExchange(cacheConfig)

  const options: ClientOptions = {
    requestPolicy: 'cache-and-network',
    fetchOptions: () => {
      const { jwt, turnstileKey } = useMaevsiStore()
      const headers = {} as Record<string, any>

      if (jwt) {
        consola.trace('GraphQL request authenticated with: ' + jwt)
        headers.authorization = `Bearer ${jwt}`
      } else {
        consola.trace('GraphQL request without authentication.')
      }

      if (turnstileKey) {
        consola.debug('Turnstile session key: ' + turnstileKey)
        headers[TURNSTILE_HEADER_KEY] = turnstileKey
      }

      return { headers }
    },

    url: config.public.stagingHost
      ? `https://postgraphile.${config.public.stagingHost}/graphql`
      : process.server
      ? 'http://postgraphile:5000/graphql'
      : 'https://postgraphile.' + getDomainTldPort(host) + '/graphql',
    exchanges: [
      ...(config.public.isInProduction ? [] : [devtoolsExchange]),
      cache,
      ssr, // `ssr` must be before `fetchExchange`
      fetchExchange,
    ],
  }
  const client = ref(createClient(options))

  const urqlReset = () => {
    client.value = createClient(options)
  }

  nuxtApp.hook('vue:setup', () => {
    const { $urql } = useNuxtApp()
    provideClient($urql)
  })

  // Either authenticate anonymously or refresh token on page load.
  if (nuxtApp.ssrContext?.event) {
    const store = useMaevsiStore(nuxtApp.ssrContext.$pinia)
    const jwtFromCookie = getJwtFromCookie({
      req: nuxtApp.ssrContext.event.node.req,
    })

    if (jwtFromCookie?.jwtDecoded?.id) {
      await jwtRefresh({
        client: client.value,
        $urqlReset: urqlReset,
        store,
        res: nuxtApp.ssrContext.event.node.res,
        id: jwtFromCookie.jwtDecoded.id as string,
      })
    } else {
      await authenticationAnonymous({
        client: client.value,
        $urqlReset: urqlReset,
        store,
        res: nuxtApp.ssrContext.event.node.res,
      })
    }
  }

  return {
    provide: {
      urql: client,
      urqlReset,
    },
  }
})
