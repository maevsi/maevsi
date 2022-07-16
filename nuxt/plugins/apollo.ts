import { Inject } from '@nuxt/types-edge/app'
import { Context } from '@nuxt/types-edge'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Vue from 'vue'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

export default ({ app }: Context, inject: Inject) => {
  const httpLink = createHttpLink({
    uri: process.server
      ? 'http://postgraphile:5000/graphql'
      : 'https://postgraphile.' +
        (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
        '/graphql',
  })
  const cache = new InMemoryCache()

  if (process.client) {
    if (typeof window !== 'undefined') {
      const state = window.__APOLLO_STATE__
      if (state) {
        cache.restore(state.defaultClient)
      }
    }
  }

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    ...(process.server
      ? {
          ssrMode: true,
        }
      : {
          ssrForceFetchDelay: 100,
        }),
  })
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
  })

  app.apolloProvider = apolloProvider

  inject('apolloProvider', apolloProvider)
}
