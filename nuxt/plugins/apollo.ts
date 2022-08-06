import { Context } from '@nuxt/types-edge'
import { ApolloClient, ApolloClientOptions, Resolvers } from 'apollo-client'
import { ApolloLink, DocumentNode, from } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import { HttpOptions } from 'apollo-link-http-common'
import { withClientState, ClientStateConfig } from 'apollo-link-state'
import {
  InMemoryCache,
  InMemoryCacheConfig,
  NormalizedCacheObject,
} from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import consola from 'consola'
import { parse } from 'cookie'

import config from './apollo-config'

export interface ApolloClientClientConfig<TCacheShape> {
  apollo?: ApolloClientOptions<TCacheShape>
  cache?: InMemoryCache | false
  clientState?: ClientStateConfig
  defaultHttpLink?: boolean
  httpEndpoint?: string
  httpLinkOptions?: HttpOptions
  inMemoryCacheOptions?: InMemoryCacheConfig
  link?: ApolloLink
  persisting?: boolean
  resolvers?: Resolvers | Resolvers[]
  ssr?: boolean
  tokenName?: string
  typeDefs?: string | string[] | DocumentNode | DocumentNode[]
  websocketsOnly?: boolean
  wsEndpoint?: string
  getAuth?: (tokenName: string) => string | void
  onCacheInit?: (cache: InMemoryCache) => Promise<void>
  validateToken?: (token: string) => boolean
}

Vue.use(VueApollo)

export default (ctx: Context) => {
  const { app, beforeNuxtRender, req } = ctx

  const tokenName = 'apollo-token'
  // const cookieAttributes = { expires: 7, path: '/', secure: false }
  const authenticationType = 'Bearer'
  const cookies = req?.headers.cookie && parse(req.headers.cookie)

  const clientConfig = config(ctx) as ApolloClientClientConfig<unknown>
  const defaultValidateToken = () => true

  function defaultGetAuth() {
    const token = cookies && cookies[tokenName]
    return token &&
      clientConfig.validateToken &&
      clientConfig.validateToken(token)
      ? `${authenticationType} ${token}`
      : ''
  }

  if (!clientConfig.validateToken) {
    clientConfig.validateToken = defaultValidateToken
  }

  const defaultCache = clientConfig.cache
    ? clientConfig.cache
    : new InMemoryCache(
        clientConfig.inMemoryCacheOptions
          ? clientConfig.inMemoryCacheOptions
          : undefined
      )

  if (!process.server && window.__NUXT__.apollo?.defaultClient) {
    defaultCache.restore(window.__NUXT__.apollo.defaultClient)
  }

  if (!clientConfig.getAuth) {
    clientConfig.getAuth = defaultGetAuth
  }

  // if (process.client && clientConfig.browserHttpEndpoint) {
  //   clientConfig.httpEndpoint = clientConfig.browserHttpEndpoint
  // }

  clientConfig.ssr = !!process.server
  clientConfig.cache = defaultCache
  // clientConfig.tokenName = defaultTokenName

  if (process.server && req?.headers.cookie) {
    if (!clientConfig.httpLinkOptions) {
      clientConfig.httpLinkOptions = {}
    }
    if (!clientConfig.httpLinkOptions.headers) {
      clientConfig.httpLinkOptions.headers = {}
    }
    clientConfig.httpLinkOptions.headers.cookie = req.headers.cookie
  }

  const defaultApolloCreation = createApolloClient({
    ...clientConfig,
  })

  const vueApolloOptions = {
    defaultClient: defaultApolloCreation.apolloClient,
    errorHandler(error: Error) {
      consola.log(
        '%cError',
        'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
        error.message
      )
    },
  }

  const apolloProvider = new VueApollo(vueApolloOptions)

  app.apolloProvider = apolloProvider

  if (process.server) {
    const apolloSSR = require('vue-apollo/ssr')
    beforeNuxtRender(({ nuxtState }) => {
      nuxtState.apollo = apolloSSR.getStates(apolloProvider)
    })
  }
}

export function createApolloClient<TCacheShape>(
  options: ApolloClientClientConfig<TCacheShape>
): {
  apolloClient: ApolloClient<NormalizedCacheObject>
  stateLink: ApolloLink | undefined
} {
  const defaultOptions = {
    clientId: 'defaultClient',
    tokenName: 'apollo-token',
    persisting: false,
    ssr: false,
    websocketsOnly: false,
    preAuthLinks: [],
    defaultHttpLink: true,
    httpLinkOptions: {},
    inMemoryCacheOptions: {},
    apollo: {},
    getAuth: defaultGetAuth,
  }

  const optionsMerged = {
    ...defaultOptions,
    ...options,
  }

  let { cache, link, persisting } = optionsMerged

  const {
    apollo,
    clientId,
    clientState,
    defaultHttpLink,
    httpEndpoint,
    httpLinkOptions,
    inMemoryCacheOptions,
    preAuthLinks,
    resolvers,
    ssr,
    tokenName,
    typeDefs,
    websocketsOnly,
    wsEndpoint,
    getAuth,
    onCacheInit,
  } = optionsMerged

  let authLink, stateLink
  const disableHttp = websocketsOnly && !ssr && wsEndpoint

  // Apollo cache
  if (!cache) {
    cache = new InMemoryCache(inMemoryCacheOptions)
  }

  if (!disableHttp) {
    const httpLink = createUploadLink({
      uri: httpEndpoint,
      ...httpLinkOptions,
    })

    if (!link) {
      link = httpLink
    } else if (defaultHttpLink) {
      link = from([link, httpLink])
    }

    // HTTP Auth header injection
    authLink = setContext(async (_, { headers }) => {
      const Authorization = await getAuth(tokenName)
      const authorizationHeader = Authorization ? { Authorization } : {}
      return {
        headers: {
          ...headers,
          ...authorizationHeader,
        },
      }
    })

    // Concat all the http link parts
    link = authLink.concat(link)

    if (preAuthLinks.length) {
      link = from(preAuthLinks).concat(authLink)
    }
  }

  // On the server, we don't want WebSockets and Upload links
  if (!ssr) {
    // If on the client, recover the injected state
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-underscore-dangle
      const state = window.__APOLLO_STATE__
      if (state && state[clientId]) {
        // Restore state
        cache.restore(state[clientId])
      }
    }

    if (!disableHttp) {
      let persistingOpts = {}
      if (typeof persisting === 'object' && persisting != null) {
        persistingOpts = persisting
        persisting = true
      }
      if (persisting === true && link) {
        link = createPersistedQueryLink(persistingOpts).concat(link)
      }
    }
  }

  if (clientState && link) {
    consola.warn(
      'clientState is deprecated, see https://vue-cli-plugin-apollo.netlify.com/guide/client-state.html'
    )
    stateLink = withClientState({
      cache,
      ...clientState,
      resolvers: undefined,
    })
    link = from([stateLink, link])
  }

  const apolloClient = new ApolloClient({
    link,
    cache,
    // Additional options
    ...(ssr
      ? {
          // Set this on the server to optimize queries when SSR
          ssrMode: true,
        }
      : {
          // This will temporary disable query force-fetching
          ssrForceFetchDelay: 100,
          // Apollo devtools
          connectToDevTools: process.env.NODE_ENV !== 'production',
        }),
    typeDefs,
    resolvers,
    ...apollo,
  })

  // Re-write the client state defaults on cache reset
  if (stateLink) {
    apolloClient.onResetStore(stateLink.writeDefaults)
  }

  if (onCacheInit) {
    onCacheInit(cache)
    apolloClient.onResetStore(() => {
      if (cache) {
        return onCacheInit(cache)
      } else {
        return Promise.resolve()
      }
    })
  }

  return {
    apolloClient,
    stateLink,
  }
}

function defaultGetAuth(tokenName: string) {
  if (typeof window !== 'undefined') {
    // get the authentication token from local storage if it exists
    const token = window.localStorage.getItem(tokenName)
    // return the headers to the context so httpLink can read them
    return token ? `Bearer ${token}` : ''
  }
}

declare global {
  interface Window {
    __APOLLO_STATE__: Record<string, NormalizedCacheObject>
    __NUXT__: Record<string, NormalizedCacheObject>
  }
}
