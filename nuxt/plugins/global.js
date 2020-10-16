import { decode } from 'jsonwebtoken'

import { AUTHENTICATE_MUTATION, JWT_REFRESH_MUTATION } from '~/scripts/apollo'

const JWT_NAME = 'apollo-token'
const JWT_NAME_ANONYMOUS = 'apollo-token_anonymous'

const global = {
  EVENT_DESCRIPTION_MAXIMUM: 10000,
  EVENT_NAME_MAXIMUM: 100,
  EVENT_PLACE_MAXIMUM: 300,
  EVENT_SLUG_MAXIMUM: 100,
  ITEMS_PER_PAGE: 8,
  JWT_NAME,
  JWT_NAME_ANONYMOUS,
  PASSWORD_LENGTH_MINIMUM: 8,
  TUSD_FILES_URL:
    'https://tusd.' + process.env.GRIDSOME_STACK_DOMAIN + '/files/',
  checkNested(obj, level, ...rest) {
    if (obj === undefined || obj === null) return false
    if (rest.length === 0 && Object.prototype.hasOwnProperty.call(obj, level))
      return true
    return this.checkNested(obj[level], ...rest)
  },
  jwtDecode(f) {
    if (typeof window !== 'undefined') {
      const jwt = localStorage.getItem(JWT_NAME)

      if (jwt !== null) {
        const jwtDecoded = decode(jwt)

        f(jwt, jwtDecoded)
      }
    }
  },
  logOut() {
    localStorage.removeItem('jwt')

    const jwtAnonymous = localStorage.getItem(JWT_NAME_ANONYMOUS)

    if (jwtAnonymous !== null) {
      localStorage.setItem(JWT_NAME, jwtAnonymous)
      localStorage.removeItem(JWT_NAME_ANONYMOUS)

      this.jwtRefresh()
    }

    location.reload()
  },
  objectClone(object) {
    const objectClone = JSON.parse(JSON.stringify(object))
    return objectClone
  },
  removeTypename(object) {
    const objectClone = this.objectClone(object)
    delete objectClone.__typename
    return objectClone
  },
  removeItemFromArray(array, prop, value) {
    let i = 0

    while (i < array.length) {
      if (prop in array[i] && array[i][prop] === value) {
        array.splice(i, 1)
        break
      } else {
        i++
      }
    }
  },
}

export { global }

export default ({ app }, inject) => {
  const globalExtended = {
    ...global,
    authenticateAnonymous() {
      app.apolloProvider.defaultClient
        .mutate({
          mutation: AUTHENTICATE_MUTATION,
          variables: {
            username: '',
            password: '',
          },
        })
        .then((data) => {
          localStorage.setItem(JWT_NAME, data.data.authenticate.jwt)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    jwtRefresh() {
      this.jwtDecode((_jwt, jwtDecoded) => {
        app.apolloProvider.defaultClient
          .mutate({
            mutation: JWT_REFRESH_MUTATION,
            variables: {
              id: jwtDecoded.id,
            },
          })
          .then((data) => {
            localStorage.setItem(JWT_NAME, data.data.jwtRefresh.jwt)
          })
          .catch((error) => {
            console.error(error)
            this.logOut()
          })
      })
    },
  }

  inject('global', globalExtended)

  // Either authenticate or refresh token on page load.
  if (typeof window !== 'undefined') {
    const jwt = localStorage.getItem(JWT_NAME)

    if (jwt === null) {
      globalExtended.authenticateAnonymous()
    } else {
      globalExtended.jwtRefresh()
    }
  }
}
