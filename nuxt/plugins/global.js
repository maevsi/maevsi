import cookie from 'cookie'
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

export async function authenticateAnonymous(apolloClient, store, res) {
  const authenticationData = await apolloClient
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

  if (!authenticationData) {
    return
  }

  await storeJwt(apolloClient, store, res, authenticationData.jwt)
}

export function checkNested(obj, level, ...rest) {
  if (obj === undefined || obj === null) return false
  if (rest.length === 0 && Object.prototype.hasOwnProperty.call(obj, level))
    return obj[level]
  return this.checkNested(obj[level], ...rest)
}

export async function jwtRefresh(apolloClient, store, res, id) {
  const jwtRefreshData = await apolloClient
    .mutate({
      mutation: JWT_REFRESH_MUTATION,
      variables: {
        id,
      },
    })
    .then(({ data }) => this.checkNested(data, 'jwtRefresh'))
    .catch((error) => {
      console.error(error)
      logOut(apolloClient, store, res)
    })

  if (!jwtRefreshData) {
    return
  }

  await storeJwt(apolloClient, store, res, jwtRefreshData.jwt)
}

async function logOut(apolloClient, store, res) {
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

export async function storeJwt(apolloClient, store, res, jwt) {
  store.commit('setJwt', jwt)
  await apolloClient.resetStore()

  if (process.server) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('apollo-token', jwt, {
        expires: jwt ? new Date(Date.now() + 86400 * 1000 * 7) : new Date(0),
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: true,
      })
    )
  } else {
    const xhr = new XMLHttpRequest()

    xhr.open('POST', '/auth', true)

    if (jwt) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + jwt)
    }

    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        switch (this.status) {
          case 500:
            alert('Authorization failed!')
            break
          default:
            alert('Authorization returned an unexpected status code.')
        }
      }
    }
    xhr.send()
  }
}

export default async ({ app, req, res, store }, inject) => {
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
    jwtRefresh,
    logOut,
    objectClone,
    removeTypename,
    removeItemFromArray,
    storeJwt,
  }

  inject('global', global)

  // TODO: move to an authentication plugin
  // Either authenticate anonymously or refresh token on page load.
  if (process.server) {
    if (req.headers.cookie) {
      const cookies = cookie.parse(req.headers.cookie)

      if (cookies['apollo-token']) {
        await global.jwtRefresh(
          app.apolloProvider.defaultClient,
          store,
          res,
          decode(cookies['apollo-token']).id
        )
      } else {
        await global.authenticateAnonymous(
          app.apolloProvider.defaultClient,
          store,
          res
        )
      }
    } else {
      await global.authenticateAnonymous(
        app.apolloProvider.defaultClient,
        store,
        res
      )
    }
  }
}
