import { decode } from 'jsonwebtoken'

import AUTHENTICATE_MUTATION from '../gql/mutation/authenticate'
import JWT_REFRESH_MUTATION from '../gql/mutation/jwtRefresh'

export const EVENT_DESCRIPTION_MAXIMUM = 10000
export const EVENT_NAME_MAXIMUM = 100
export const EVENT_PLACE_MAXIMUM = 300
export const EVENT_SLUG_MAXIMUM = 100
export const ITEMS_PER_PAGE = 8
export const PASSWORD_LENGTH_MINIMUM = 8
export const TUSD_FILES_URL =
  'https://tusd.' + (process.env.NUXT_STACK_DOMAIN || 'maevsi.test') + '/files/'

export async function authenticateAnonymous(app) {
  const res = await app.apolloProvider.defaultClient
    .mutate({
      mutation: AUTHENTICATE_MUTATION,
      variables: {
        username: '',
        password: '',
      },
    })
    .then(({ data }) => this.checkNested(data, 'authenticate'))
    .catch((error) => {
      console.error(error)
    })

  await app.$apolloHelpers.onLogin(res.jwt)
}

export function checkNested(obj, level, ...rest) {
  if (obj === undefined || obj === null) return false
  if (rest.length === 0 && Object.prototype.hasOwnProperty.call(obj, level))
    return obj[level]
  return this.checkNested(obj[level], ...rest)
}

export function jwtDecode(app, f) {
  if (typeof window !== 'undefined') {
    const jwt = app.$apolloHelpers.getToken()

    if (jwt) {
      const jwtDecoded = decode(jwt)

      return f(jwt, jwtDecoded)
    }
  }

  // else
  return ''
}

export function jwtRefresh(app) {
  this.jwtDecode(app, async (_jwt, jwtDecoded) => {
    const res = await app.apolloProvider.defaultClient
      .mutate({
        mutation: JWT_REFRESH_MUTATION,
        variables: {
          id: jwtDecoded.id,
        },
      })
      .then(({ data }) => this.checkNested(data, 'jwtRefresh'))
      .catch((error) => {
        console.error(error)
        this.logOut(app)
      })

    await app.$apolloHelpers.onLogin(res.jwt)
  })
}

async function logOut(app) {
  await app.$apolloHelpers.onLogout()
  location.reload()
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

export function removeItemFromArray(array, prop, value) {
  let i = 0

  while (i < array.length) {
    if (prop in array[i] && array[i][prop] === value) {
      array.splice(i, 1)
      break
    } else {
      i++
    }
  }
}

export default ({ app }, inject) => {
  const global = {
    EVENT_DESCRIPTION_MAXIMUM,
    EVENT_NAME_MAXIMUM,
    EVENT_PLACE_MAXIMUM,
    EVENT_SLUG_MAXIMUM,
    ITEMS_PER_PAGE,
    PASSWORD_LENGTH_MINIMUM,
    TUSD_FILES_URL,
    authenticateAnonymous,
    checkNested,
    jwtDecode,
    jwtRefresh,
    logOut,
    objectClone,
    removeTypename,
    removeItemFromArray,
  }

  inject('global', global)

  // Either authenticate or refresh token on page load.
  if (typeof window !== 'undefined') {
    const jwt = app.$apolloHelpers.getToken()

    if (jwt) {
      global.jwtRefresh(app)
    } else {
      global.authenticateAnonymous(app)
    }
  }

  // return global
}
