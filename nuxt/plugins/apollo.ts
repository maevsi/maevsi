import { Inject } from '@nuxt/types-edge/app'
import { Context } from '@nuxt/types-edge'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Vue from 'vue'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

const httpLink = createHttpLink({
  uri: process.server
    ? 'http://postgraphile:5000/graphql'
    : 'https://postgraphile.' +
      (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
      '/graphql',
})
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

export default (_: Context, inject: Inject) => {
  inject('apolloProvider', apolloProvider)
}
