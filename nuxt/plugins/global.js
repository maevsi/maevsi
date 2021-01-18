import cookie from 'cookie'
import { decode } from 'jsonwebtoken'
import { helpers } from 'vuelidate/lib/validators'

import AUTHENTICATE_MUTATION from '~/gql/mutation/authenticate'
import JWT_REFRESH_MUTATION from '~/gql/mutation/jwtRefresh'

const consola = require('consola')

export const ITEMS_PER_PAGE = 8
export const REGEX_SLUG = /^[-A-Za-z0-9]+$/
export const REGEX_UUID = /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/
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
export const VALIDATION_FIRST_NAME_LENGTH_MAXIMUM = 100
export const VALIDATION_FORMAT_SLUG = helpers.regex('slug', REGEX_SLUG)
export const VALIDATION_FORMAT_UUID = helpers.regex('uuid', REGEX_UUID)
export const VALIDATION_LAST_NAME_LENGTH_MAXIMUM = 100
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

  await storeJwt(apolloClient, store, res, authenticationData.jwt)
}

export function blur(form, blurFields, fieldName, data) {
  blurFields[fieldName] = true
  form[fieldName].$model = data
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
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
        consola.debug('Token expired.')
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

  if (!jwtRefreshData) {
    return
  }

  await storeJwt(apolloClient, store, res, jwtRefreshData.jwt)
}

async function signOut(apolloClient, store, res) {
  await storeJwt(apolloClient, store, res, null)
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

export async function storeJwt(
  apolloClient,
  store,
  res,
  jwt,
  callback = () => {
    window.location.reload()
  }
) {
  consola.debug('Storing the following JWT: ' + jwt)
  store.commit('setJwt', jwt)

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
      (_reason) => alert('Authorization failed!')
    )
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
        reject(
          new Error({
            status: this.status,
            statusText: xhr.statusText,
          })
        )
      }
    }
    xhr.onerror = function () {
      reject(
        new Error({
          status: this.status,
          statusText: xhr.statusText,
        })
      )
    }
    xhr.send()
  })
}

export default async ({ app, req, res, store }, inject) => {
  const global = {
    ITEMS_PER_PAGE,
    REGEX_SLUG,
    REGEX_UUID,
    TUSD_FILES_URL,
    VALIDATION_ADDRESS_LENGTH_MAXIMUM,
    VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM,
    VALIDATION_EVENT_DESCRIPTION_LENGTH_MAXIMUM,
    VALIDATION_EVENT_LOCATION_LENGTH_MAXIMUM,
    VALIDATION_EVENT_NAME_LENGTH_MAXIMUM,
    VALIDATION_EVENT_SLUG_LENGTH_MAXIMUM,
    VALIDATION_FIRST_NAME_LENGTH_MAXIMUM,
    VALIDATION_FORMAT_SLUG,
    VALIDATION_FORMAT_UUID,
    VALIDATION_LAST_NAME_LENGTH_MAXIMUM,
    VALIDATION_PASSWORD_LENGTH_MINIMUM,
    VALIDATION_USERNAME_LENGTH_MAXIMUM,
    authenticateAnonymous,
    blur,
    capitalizeFirstLetter,
    getDeferredPromise,
    getJwtFromCookie,
    getNested,
    getQueryString,
    jwtRefresh,
    signOut,
    objectClone,
    removeTypename,
    storeJwt,
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
