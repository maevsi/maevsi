import { IncomingMessage, ServerResponse } from 'http'

import { Context } from '@nuxt/types-edge'
import { Inject } from '@nuxt/types-edge/app'
import { helpers } from '@vuelidate/validators'
import { ApolloClient } from 'apollo-client'
import consola from 'consola'
import { serialize, parse } from 'cookie'
import { GraphQLError } from 'graphql'
import { decode, JwtPayload } from 'jsonwebtoken'
import unionBy from 'lodash-es/unionBy'
import moment from 'moment'
import { DollarApollo } from 'vue-apollo/types/vue-apollo'
import { Store } from 'vuex'

import AUTHENTICATE_MUTATION from '~/gql/mutation/account/accountAuthenticate.gql'
import JWT_REFRESH_MUTATION from '~/gql/mutation/account/accountJwtRefresh.gql'
import ACCOUNT_IS_EXISTING_MUTATION from '~/gql/query/account/accountIsExisting.gql'
import EVENT_IS_EXISTING_MUTATION from '~/gql/query/event/eventIsExisting.gql'
import { Contact } from '~/types/contact'
import { State } from '~/store'

type Dictionary<T> = { [key: string]: T } // import { Dictionary } from 'vue-router/types/router'

export const ITEMS_PER_PAGE = 8
export const ITEMS_PER_PAGE_LARGE = 100
export const REGEX_PHONE_NUMBER =
  /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/
export const REGEX_SLUG = /^[-A-Za-z0-9]+$/
export const REGEX_UPPERCASE_NONE = /^[^A-Z]+$/
export const REGEX_URL_HTTPS = /^https:\/\//
export const REGEX_UUID =
  /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/
export const TUSD_FILES_URL =
  'https://tusd.' +
  (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
  '/files/'
export const VALIDATION_ADDRESS_LENGTH_MAXIMUM = 300
export const VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM = 320
export const VALIDATION_EVENT_DESCRIPTION_LENGTH_MAXIMUM = 10000
export const VALIDATION_EVENT_LOCATION_LENGTH_MAXIMUM = 300
export const VALIDATION_EVENT_NAME_LENGTH_MAXIMUM = 100
export const VALIDATION_EVENT_SLUG_LENGTH_MAXIMUM = 100
export const VALIDATION_EVENT_URL_LENGTH_MAXIMUM = 300
export const VALIDATION_FIRST_NAME_LENGTH_MAXIMUM = 100
export const VALIDATION_FORMAT_PHONE_NUMBER = helpers.regex(REGEX_PHONE_NUMBER)
export const VALIDATION_FORMAT_SLUG = helpers.regex(REGEX_SLUG)
export const VALIDATION_FORMAT_UPPERCASE_NONE =
  helpers.regex(REGEX_UPPERCASE_NONE)
export const VALIDATION_FORMAT_URL_HTTPS = helpers.regex(REGEX_URL_HTTPS)
export const VALIDATION_FORMAT_UUID = helpers.regex(REGEX_UUID)
export const VALIDATION_LAST_NAME_LENGTH_MAXIMUM = 100
export const VALIDATION_NOW_OR_FUTURE = (value: moment.Moment) =>
  value.isSameOrAfter(moment())
export const VALIDATION_PASSWORD_LENGTH_MINIMUM = 8
export const VALIDATION_USERNAME_LENGTH_MAXIMUM = 100

export async function authenticateAnonymous(
  apolloClient: ApolloClient<any>,
  store: Store<State>,
  res: ServerResponse
) {
  consola.trace('Authenticating anonymously...')

  const authenticationData = await apolloClient
    .mutate({
      mutation: AUTHENTICATE_MUTATION,
      variables: {
        username: '',
        password: '',
      },
    })
    .then(({ data }) => getNested(data, 'authenticate'))
    .catch((reason) => {
      consola.error(reason)
    })

  if (!authenticationData) {
    return
  }

  await jwtStore(apolloClient, store, res, authenticationData.jwt)
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export async function formPreSubmit(that: any): Promise<boolean> {
  that.graphqlError = undefined
  that.v$.$touch()

  const isFormValid = await that.v$.$validate()
  that.isFormSent = isFormValid

  if (!isFormValid) {
    throw new Error('Form is invalid!')
  }

  return isFormValid
}

export function getContactName(
  contact: Contact,
  isUsernamePreferred = false
): string | undefined {
  let name

  if (contact.accountUsername) {
    name = contact.accountUsername

    if (isUsernamePreferred) return name
  }

  if (contact.firstName) {
    name = contact.firstName
  }

  if (contact.lastName) {
    name += ' ' + contact.lastName
  }

  return name
}

export function getDeferredPromise<T>(then?: (value: any) => T): Promise<T> {
  let res, rej

  const promise: any = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  promise.resolve = res
  promise.reject = rej

  if (then) {
    promise.then((value: any) => {
      then(value)
    })
  }

  return promise
}

export function getGqlErrorMessages(
  graphqlError:
    | {
        graphQLErrors: (GraphQLError & { errcode: string })[]
      }
    | undefined,
  that: any
): string[] | undefined {
  if (!graphqlError) return
  return graphqlError.graphQLErrors.map((e) => {
    const translationId = 'postgres' + e.errcode
    const translation = that.$t(translationId)

    if (translation === translationId) {
      return e.message
    } else {
      return translation
    }
  })
}

export function getJwtFromCookie(
  req: IncomingMessage
): { jwt: string; jwtDecoded: JwtPayload } | undefined {
  if (req.headers.cookie) {
    const cookies = parse(req.headers.cookie)

    if (cookies['__Secure-apollo-token']) {
      const cookie = decode(cookies['__Secure-apollo-token']) as JwtPayload

      if (cookie.exp !== undefined && cookie.exp > Date.now() / 1000) {
        return {
          jwt: cookies['__Secure-apollo-token'],
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

export function getNested(
  obj: any | undefined | null,
  level: keyof any,
  ...rest: (keyof any)[]
): undefined | any {
  if (obj === undefined || obj === null) return undefined
  if (rest.length === 0 && Object.prototype.hasOwnProperty.call(obj, level))
    return obj[level]
  // @ts-ignore
  return getNested(obj[level], ...rest)
}

export function getQueryString(
  queryParametersObject: Dictionary<
    string | ((string | null)[] & { pw: 'lost' | 'found' })
  >
): string {
  return (
    '?' +
    Object.keys(queryParametersObject)
      .map((key) => {
        return (
          encodeURIComponent(key) +
          '=' +
          encodeURIComponent(queryParametersObject[key] as string)
        )
      })
      .join('&')
  )
}

export async function jwtRefresh(
  apolloClient: ApolloClient<any>,
  store: Store<State>,
  res: ServerResponse,
  id: string
) {
  consola.trace('Refreshing a JWT...')

  const jwtRefreshData = await apolloClient
    .mutate({
      mutation: JWT_REFRESH_MUTATION,
      variables: {
        id,
      },
    })
    .then(({ data }) => getNested(data, 'jwtRefresh'))
    .catch((reason) => {
      consola.error(reason)
      signOut(apolloClient, store, res)
    })

  if (!jwtRefreshData.jwt) {
    await authenticateAnonymous(apolloClient, store, res)
  } else {
    await jwtStore(apolloClient, store, res, jwtRefreshData.jwt)
  }
}

export async function jwtStore(
  apolloClient: ApolloClient<any>,
  store: Store<State>,
  res: ServerResponse | undefined,
  jwt: string | undefined,
  callback = () => {
    window.location.reload()
  }
) {
  await apolloClient.clearStore()

  consola.trace('Storing the following JWT: ' + jwt)
  store.commit('jwtSet', jwt)

  if (process.server) {
    res?.setHeader(
      'Set-Cookie',
      serialize('__Secure-apollo-token', jwt || '', {
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

async function loadMore(
  $apollo: DollarApollo<Vue>,
  key: string,
  dataCurrent: any
) {
  if (!dataCurrent.pageInfo.hasNextPage) return

  await $apollo.queries[key].fetchMore({
    variables: {
      offset: dataCurrent.nodes.length,
    },
    updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult) {
        return previousResult
      }

      const newNodes = fetchMoreResult[key].nodes
      const pageInfo = fetchMoreResult[key].pageInfo
      const totalCount = fetchMoreResult[key].totalCount

      const result = {} as Record<string, any>

      result[key] = {
        __typename: previousResult[key].__typename,
        nodes: unionBy(previousResult[key].nodes, newNodes, 'nodeId'),
        pageInfo,
        totalCount,
      }

      return result
    },
  })
}

async function signOut(
  apolloClient: ApolloClient<any>,
  store: Store<State>,
  res?: ServerResponse
) {
  await jwtStore(apolloClient, store, res, undefined)
}

export function objectClone<T>(object: T): T {
  return JSON.parse(JSON.stringify(object))
}

export function removeTypename<T extends Object & { __typename?: string }>(
  object: T
): Omit<T, '__typename'> {
  const clonedObject = objectClone<T>(object)
  delete clonedObject.__typename
  return clonedObject
}

export function validateEventSlug(
  apollo: ApolloClient<any>,
  signedInUserName: string,
  invert: boolean,
  exclude?: string
): (value: string) => Promise<boolean> {
  return async (value: string) => {
    if (!helpers.req(value)) {
      return true
    }

    if (value === exclude) {
      return true
    }

    const {
      data: { eventIsExisting },
    } = await apollo.query({
      query: EVENT_IS_EXISTING_MUTATION,
      variables: {
        authorUsername: signedInUserName,
        slug: value,
      },
      fetchPolicy: 'network-only',
    })

    return invert ? !eventIsExisting : eventIsExisting
  }
}

export function validateUsername(
  apollo: DollarApollo<Vue>,
  invert?: boolean
): (value: string) => Promise<boolean> {
  return async (value: string) => {
    if (!helpers.req(value)) {
      return true
    }

    const {
      data: { accountIsExisting },
    } = await apollo.query({
      query: ACCOUNT_IS_EXISTING_MUTATION,
      variables: {
        username: value,
      },
      fetchPolicy: 'network-only',
    })

    return invert ? !accountIsExisting : accountIsExisting
  }
}

export function xhrPromise(
  method: string,
  url: string,
  jwt: string
): Promise<any> {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)

    if (jwt) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + jwt)
    }

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response)
      } else {
        reject(new Error(`${this.status}\n${xhr.statusText}`))
      }
    }
    xhr.onerror = function () {
      reject(new Error(`${this.status}\n${xhr.statusText}`))
    }
    xhr.send()
  })
}

const util = {
  ITEMS_PER_PAGE,
  ITEMS_PER_PAGE_LARGE,
  REGEX_PHONE_NUMBER,
  REGEX_SLUG,
  REGEX_UPPERCASE_NONE,
  REGEX_URL_HTTPS,
  REGEX_UUID,
  TUSD_FILES_URL,
  VALIDATION_ADDRESS_LENGTH_MAXIMUM,
  VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM,
  VALIDATION_EVENT_DESCRIPTION_LENGTH_MAXIMUM,
  VALIDATION_EVENT_LOCATION_LENGTH_MAXIMUM,
  VALIDATION_EVENT_NAME_LENGTH_MAXIMUM,
  VALIDATION_EVENT_SLUG_LENGTH_MAXIMUM,
  VALIDATION_EVENT_URL_LENGTH_MAXIMUM,
  VALIDATION_FIRST_NAME_LENGTH_MAXIMUM,
  VALIDATION_FORMAT_PHONE_NUMBER,
  VALIDATION_FORMAT_SLUG,
  VALIDATION_FORMAT_UPPERCASE_NONE,
  VALIDATION_FORMAT_URL_HTTPS,
  VALIDATION_FORMAT_UUID,
  VALIDATION_LAST_NAME_LENGTH_MAXIMUM,
  VALIDATION_NOW_OR_FUTURE,
  VALIDATION_PASSWORD_LENGTH_MINIMUM,
  VALIDATION_USERNAME_LENGTH_MAXIMUM,
  authenticateAnonymous,
  capitalizeFirstLetter,
  formPreSubmit,
  getContactName,
  getDeferredPromise,
  getGqlErrorMessages,
  getJwtFromCookie,
  getNested,
  getQueryString,
  jwtRefresh,
  jwtStore,
  loadMore,
  signOut,
  objectClone,
  removeTypename,
  validateEventSlug,
  validateUsername,
  xhrPromise,
}

export default async ({ app, req, res, store }: Context, inject: Inject) => {
  inject('util', util)

  // Either authenticate anonymously or refresh token on page load.
  if (process.server) {
    const jwtData = getJwtFromCookie(req)

    const apolloClient = app.apolloProvider!.defaultClient

    if (jwtData) {
      await jwtRefresh(apolloClient, store, res, jwtData.jwtDecoded.id)
    } else {
      await authenticateAnonymous(apolloClient, store, res)
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $util: typeof util
  }
}

declare module '@nuxt/types-edge' {
  interface NuxtAppOptions {
    $util: typeof util
  }
  interface Context {
    $util: typeof util
  }
}
