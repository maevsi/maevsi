import {
  createClient,
  ssrExchange as getSsrExchange,
  fetchExchange,
  type ClientOptions,
  type SSRData,
} from '@urql/core'
import {
  type Cache,
  offlineExchange as getOfflineExchange,
} from '@urql/exchange-graphcache'
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage'
import { relayPagination } from '@urql/exchange-graphcache/extras'
import { devtoolsExchange } from '@urql/devtools'
import { provideClient } from '@urql/vue'
import type { Client } from '@urql/vue'
import { consola } from 'consola'
import { ref } from 'vue'

import schema from '~~/gql/generated/introspection'
import type { GraphCacheConfig } from '~~/gql/generated/graphcache'

const SSR_KEY = '__URQL_DATA__'
const invalidateCache = (
  cache: Cache,
  name: string,
  args?: { input: { id: string | number | null } },
) =>
  args
    ? cache.invalidate({ __typename: name, id: args.input.id })
    : cache
        .inspectFields('Query')
        .filter((field) => field.fieldName === name)
        .forEach((field) => {
          cache.invalidate('Query', field.fieldKey)
        })

export default defineNuxtPlugin(async (nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const getServiceHref = useGetServiceHref()

  const ssrExchange = getSsrExchange({
    isClient: import.meta.client,
  })

  if (import.meta.client) {
    nuxtApp.hook('app:created', () => {
      ssrExchange.restoreData(nuxtApp.payload[SSR_KEY] as SSRData)
    })
  }

  if (import.meta.server) {
    nuxtApp.hook('app:rendered', () => {
      nuxtApp.payload[SSR_KEY] = ssrExchange.extractData()
    })
  }

  const graphCacheConfig: GraphCacheConfig = {
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
        createContact: (_result, _args, cache, _info) =>
          invalidateCache(cache, 'allContacts'),
        createInvitation: (_result, _args, cache, _info) =>
          invalidateCache(cache, 'allInvitations'),
        // TODO: create manual updates that do not require invalidation (https://github.com/maevsi/maevsi/issues/720)
        // createInvitation: (result, args, cache, info) => {
        //   cache.updateQuery(
        //     {
        //       query: allInvitationsQuery,
        //       variables: {
        //         eventId: args.input.invitation.eventId,
        //         first: 10, // Replace with the appropriate value or keep this dynamic
        //         after: null, // Update accordingly, this could be the first page of results
        //       },
        //     },
        //     (data) => {
        //       if (data?.allInvitations?.nodes) {
        //         // Append the new invitation to the allInvitations array
        //         return {
        //           ...data,
        //           allInvitations: {
        //             ...data.allInvitations,
        //             nodes: [
        //               ...data.allInvitations.nodes,
        //               ...(result.createInvitation?.invitation
        //                 ? [result.createInvitation?.invitation]
        //                 : []),
        //             ],
        //             totalCount: data.allInvitations.totalCount + 1,
        //           },
        //         }
        //       } else {
        //         return data
        //       }
        //     },
        //   )
        // },

        // update
        profilePictureSet: (_result, _args, cache, _info) =>
          invalidateCache(cache, 'profilePictureByAccountId'),

        // delete
        deleteContactById: (_result, args, cache, _info) =>
          invalidateCache(cache, 'Contact', args),
        deleteInvitationById: (_result, args, cache, _info) =>
          invalidateCache(cache, 'Invitation', args),
      },
    },
  }

  const cacheExchange = import.meta.client
    ? getOfflineExchange({
        ...graphCacheConfig,
        schema,
        storage: makeDefaultStorage(),
      })
    : undefined

  const clientOptions: ClientOptions = {
    requestPolicy: 'cache-and-network',
    fetchOptions: () => {
      const store = useMaevsiStore()
      const headers = {} as Record<string, string>

      if (store.jwt) {
        consola.trace('GraphQL request authenticated with: ' + store.jwt)
        headers.authorization = `Bearer ${store.jwt}`
      } else {
        consola.trace('GraphQL request without authentication.')
      }

      if (store.turnstileToken) {
        consola.debug(`Turnstile token: ${store.turnstileToken}`)
        headers[TURNSTILE_HEADER_KEY] = store.turnstileToken
        store.turnstileToken = undefined
      }

      return { headers }
    },
    url: getServiceHref({ name: 'postgraphile', port: 5000 }) + '/graphql',
    exchanges: [
      ...(runtimeConfig.public.vio.isInProduction ? [] : [devtoolsExchange]),
      ...(cacheExchange ? [cacheExchange] : []),
      ssrExchange, // `ssrExchange` must be before `fetchExchange`
      fetchExchange,
    ],
  }
  const client = ref(createClient(clientOptions))

  const urqlReset = () => (client.value = createClient(clientOptions))

  nuxtApp.hook('vue:setup', () => {
    const { $urql } = useNuxtApp()
    provideClient($urql)
  })

  // Either authenticate anonymously or refresh token on page load.
  if (nuxtApp.ssrContext) {
    const store = useMaevsiStore()
    const jwtFromCookie = getJwtFromCookie()

    if (jwtFromCookie?.jwtDecoded?.id) {
      await jwtRefresh({
        $urqlReset: urqlReset,
        client: client.value,
        event: nuxtApp.ssrContext.event,
        id: jwtFromCookie.jwtDecoded.id as string,
        isInProduction: runtimeConfig.public.vio.isInProduction,
        store,
      })
    } else {
      await authenticationAnonymous({
        $urqlReset: urqlReset,
        client: client.value,
        event: nuxtApp.ssrContext.event,
        isInProduction: runtimeConfig.public.vio.isInProduction,
        store,
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

declare module '#app' {
  interface NuxtApp {
    $urql: Ref<Client>
    $urqlReset: () => Client
  }
}
