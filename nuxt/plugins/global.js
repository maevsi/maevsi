import cookie from 'cookie'
import { decode } from 'jsonwebtoken'
import moment from 'moment'
import { helpers } from 'vuelidate/lib/validators'

import AUTHENTICATE_MUTATION from '~/gql/mutation/account/accountAuthenticate.gql'
import JWT_REFRESH_MUTATION from '~/gql/mutation/account/accountJwtRefresh.gql'
import ACCOUNT_IS_EXISTING_MUTATION from '~/gql/query/account/accountIsExisting.gql'

const consola = require('consola')

export const ITEMS_PER_PAGE = 8
export const REGEX_SLUG = /^[-A-Za-z0-9]+$/
export const REGEX_URL = /^https:\/\//
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
export const VALIDATION_FORMAT_SLUG = helpers.regex('slug', REGEX_SLUG)
export const VALIDATION_FORMAT_URL = helpers.regex('url', REGEX_URL)
export const VALIDATION_FORMAT_UUID = helpers.regex('uuid', REGEX_UUID)
export const VALIDATION_LAST_NAME_LENGTH_MAXIMUM = 100
export const VALIDATION_NOW_OR_FUTURE = (value) => value.isSameOrAfter(moment())
export const VALIDATION_PASSWORD_LENGTH_MINIMUM = 8
export const VALIDATION_USERNAME_LENGTH_MAXIMUM = 100

export async function authenticateAnonymous(apolloClient, store, res) {
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

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function formPreSubmit(that) {
  return new Promise((resolve, reject) => {
    that.graphqlError = undefined
    that.$v.$touch()

    // Workaround until https://vuelidate-next.netlify.app/.
    const waitPending = () => {
      if (that.$v.$pending) {
        setTimeout(() => {
          waitPending()
        }, 100)
      } else {
        if (that.$v.$invalid) {
          reject(Error('Form is invalid!'))
          return
        }

        that.form.sent = true

        resolve()
      }
    }

    waitPending()
  })
}

export function getContactName(contact, isUsernamePreferred = false) {
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

export function getDeferredPromise(then) {
  let res, rej

  const promise = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  promise.resolve = res
  promise.reject = rej

  if (then) {
    promise.then((value) => {
      then(value)
    })
  }

  return promise
}

export function getJwtFromCookie(req) {
  if (req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie)

    if (cookies['__Secure-apollo-token']) {
      const cookie = decode(cookies['__Secure-apollo-token'])

      if (cookie.exp > Date.now() / 1000) {
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

export function getNested(obj, level, ...rest) {
  if (obj === undefined || obj === null) return undefined
  if (rest.length === 0 && Object.prototype.hasOwnProperty.call(obj, level))
    return obj[level]
  return getNested(obj[level], ...rest)
}

export function getQueryString(queryParametersObject) {
  return (
    '?' +
    Object.keys(queryParametersObject)
      .map((key) => {
        return (
          encodeURIComponent(key) +
          '=' +
          encodeURIComponent(queryParametersObject[key])
        )
      })
      .join('&')
  )
}

export async function jwtRefresh(apolloClient, store, res, id) {
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
  apolloClient,
  store,
  res,
  jwt,
  callback = () => {
    window.location.reload()
  }
) {
  consola.trace('Storing the following JWT: ' + jwt)
  store.commit('jwtSet', jwt)

  await apolloClient.clearStore()

  if (process.server) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('__Secure-apollo-token', jwt, {
        expires: jwt ? new Date(Date.now() + 86400 * 1000 * 31) : new Date(0),
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: true,
      })
    )
  } else {
    xhrPromise('POST', '/auth', jwt).then(
      (_value) => callback(),
      (_reason) =>
        store.commit('modalAdd', {
          contentBody: 'Authorization failed!',
        })
    )
  }
}

async function signOut(apolloClient, store, res) {
  await jwtStore(apolloClient, store, res, null)
}

export function objectClone(object) {
  const objectClone = JSON.parse(JSON.stringify(object))
  return objectClone
}

export function removeTypename(object) {
  const objectClone = this.objectClone(object)
  delete objectClone.__typename
  return objectClone
}

export function validateUsername(apollo) {
  return async (value) => {
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
    })

    return accountIsExisting
  }
}

export function xhrPromise(method, url, jwt) {
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

export default async ({ app, req, res, store }, inject) => {
  const global = {
    ITEMS_PER_PAGE,
    REGEX_SLUG,
    REGEX_URL,
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
    VALIDATION_FORMAT_SLUG,
    VALIDATION_FORMAT_URL,
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
    getJwtFromCookie,
    getNested,
    getQueryString,
    jwtRefresh,
    jwtStore,
    signOut,
    objectClone,
    removeTypename,
    validateUsername,
    xhrPromise,
  }

  inject('global', global)

  // Either authenticate anonymously or refresh token on page load.
  if (process.server) {
    const jwtData = getJwtFromCookie(req)

    if (jwtData) {
      await jwtRefresh(
        app.apolloProvider.defaultClient,
        store,
        res,
        jwtData.jwtDecoded.id
      )
    } else {
      await authenticateAnonymous(app.apolloProvider.defaultClient, store, res)
    }
  }
}
