import {
  createClient,
  ssrExchange,
  dedupExchange,
  fetchExchange,
} from '@urql/core'
import { cacheExchange, Variables } from '@urql/exchange-graphcache'
import { relayPagination } from '@urql/exchange-graphcache/extras'
import { devtoolsExchange } from '@urql/devtools'
// import schema from '../gql/introspection';
// import { GraphCacheConfig } from '~/gql/schema';
import { provideClient } from '@urql/vue'
import consola from 'consola'

import { defineNuxtPlugin, useNuxtApp } from '#app'

const ssrKey = '__URQL_DATA__'

export default defineNuxtPlugin((nuxt) => {
  // const { vueApp } = nuxt

  const ssr = ssrExchange({
    isClient: process.client,
  })

  if (process.client) {
    nuxt.hook('app:created', () => {
      ssr.restoreData(nuxt.payload[ssrKey])
    })
  }

  if (process.server) {
    nuxt.hook('app:rendered', () => {
      nuxt.payload[ssrKey] = ssr.extractData()
    })
  }

  // // use urql graphcache
  // const cacheConfig: GraphCacheConfig = {
  //   schema,
  //   keys: {
  //     Country: (data) => data.code || null
  //   },
  //   resolvers: {
  //     Query: {
  //       country: (_, args) => ({__typename: "Country", code: args.code})
  //     }
  //   }
  //   // storage: process.client ? makeDefaultStorage() : undefined
  // }
  const cache = cacheExchange({
    resolvers: {
      Query: {
        allContacts: relayPagination(),
        allEvents: relayPagination(),
        allUploads: relayPagination(),
      },
    },
    updates: {
      Mutation: {
        eventDelete(_parent, args, cache, _info) {
          debugger
          cache.invalidate({
            __typename: 'Event',
            id: (args.input as Variables).id as string | number,
          })
        },
      },
    },
  })

  const client = createClient({
    fetchOptions: () => {
      const jwt: string = nuxt.$store.state.jwt

      if (jwt) {
        consola.trace('Apollo request authenticated with: ' + jwt)
        return {
          headers: { authorization: `Bearer ${jwt}` },
        }
      } else {
        consola.trace('Apollo request without authentication.')
        return {
          headers: { authorization: '' },
        }
      }
    },
    url: process.server
      ? 'http://postgraphile:5000/graphql'
      : 'https://postgraphile.' +
        (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
        '/graphql',
    exchanges: [
      ...(process.env.NODE_ENV === 'production' ? [] : [devtoolsExchange]),
      dedupExchange,
      cache,
      ssr, // add `ssr` before `fetchExchange`
      fetchExchange,
    ],
  })

  nuxt.provide('urql', client)
  // vueApp.provide('$urql', ref(client))

  nuxt.hook('vue:setup', () => {
    const { $urql } = useNuxtApp()
    provideClient($urql)
  })
})

// declare module '#app' {
//   interface NuxtApp {
//     $urql: Client
//   }
// }
