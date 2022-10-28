import {
  createClient,
  ssrExchange,
  dedupExchange,
  fetchExchange,
  ClientOptions,
} from '@urql/core'
import { cacheExchange } from '@urql/exchange-graphcache'
import { relayPagination } from '@urql/exchange-graphcache/extras'
import { devtoolsExchange } from '@urql/devtools'
import { provideClient } from '@urql/vue'
import consola from 'consola'
import { ref } from 'vue'

import schema from '~/gql/introspection'
import { GraphCacheConfig } from '~/gql/schema'

import {
  authenticationAnonymous,
  jwtFromCookie,
  jwtRefresh,
} from '~/plugins/util/auth'
import { useMaevsiStore } from '~/store'

const ssrKey = '__URQL_DATA__'

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
        allUploads: relayPagination(),
      },
    },
    // updates: {
    //   Mutation: {
    //     eventDelete(_parent, args, cache, _info) {
    //       cache.invalidate({
    //         __typename: 'Event',
    //         id: (args.input as Variables).id as string | number,
    //       })
    //     },
    //   },
    // },
  }

  // @ts-ignore https://github.com/FormidableLabs/urql/issues/2639
  const cache = cacheExchange(cacheConfig)

  const options: ClientOptions = {
    requestPolicy: 'network-only', // TODO: https://github.com/maevsi/maevsi/issues/720
    fetchOptions: () => {
      const store = useMaevsiStore(nuxtApp.$pinia)
      const jwt = store.jwt

      if (jwt) {
        consola.trace('GraphQL request authenticated with: ' + jwt)
        return {
          headers: { authorization: `Bearer ${jwt}` },
        }
      } else {
        consola.trace('GraphQL request without authentication.')
        return {}
      }
    },
    url: config.public.stagingHost
      ? `https://postgraphile.${config.public.stagingHost}/graphql`
      : process.server
      ? 'http://postgraphile:5000/graphql'
      : 'https://postgraphile.' + host + '/graphql',
    exchanges: [
      ...(config.public.isInProduction ? [] : [devtoolsExchange]),
      dedupExchange,
      cache,
      ssr, // add `ssr` before `fetchExchange`
      fetchExchange,
    ],
  }
  const client = ref(createClient(options))

  function urqlReset() {
    client.value = createClient(options)
  }

  nuxtApp.hook('vue:setup', () => {
    const { $urql } = useNuxtApp()
    provideClient($urql)
  })

  // Either authenticate anonymously or refresh token on page load.
  if (nuxtApp.ssrContext?.event) {
    const store = useMaevsiStore(nuxtApp.ssrContext.$pinia)
    const jwtData = jwtFromCookie({ req: nuxtApp.ssrContext.event.req })

    if (jwtData?.jwtDecoded.id) {
      await jwtRefresh({
        client: client.value,
        $urqlReset: urqlReset,
        store,
        res: nuxtApp.ssrContext.event.res,
        id: jwtData.jwtDecoded.id as string,
      })
    } else {
      await authenticationAnonymous({
        client: client.value,
        $urqlReset: urqlReset,
        store,
        res: nuxtApp.ssrContext.event.res,
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

// declare module '#app' {
//   interface NuxtAppCompat {
//     $urql: Ref<Client>
//     urqlReset: () => undefined
//   }
// }
