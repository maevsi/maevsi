import {
  createClient,
  ssrExchange,
  dedupExchange,
  fetchExchange,
} from '@urql/core'
import { cacheExchange } from '@urql/exchange-graphcache'
import { relayPagination } from '@urql/exchange-graphcache/extras'
import { devtoolsExchange } from '@urql/devtools'
import { provideClient } from '@urql/vue'
import consola from 'consola'

import { defineNuxtPlugin, useNuxtApp } from '#app'

const ssrKey = '__URQL_DATA__'

export default defineNuxtPlugin((nuxt) => {
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

  const cache = cacheExchange({
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
  })

  const client = createClient({
    requestPolicy: 'network-only', // TODO: https://github.com/maevsi/maevsi/issues/720
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

  nuxt.hook('vue:setup', () => {
    const { $urql } = useNuxtApp()
    provideClient($urql)
  })
})
