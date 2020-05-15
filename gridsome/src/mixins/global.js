import { AUTHENTICATE_MUTATION, JWT_REFRESH_MUTATION } from '~/apollo/documents'

import { decode } from 'jsonwebtoken'

export default {
  data () {
    return {
      ITEMS_PER_PAGE: 8
    }
  },
  methods: {
    $authenticateAnonymous (apolloProvider) {
      apolloProvider.defaultClient.mutate({
        mutation: AUTHENTICATE_MUTATION,
        variables: {
          username: '',
          password: ''
        }
      }).then((data) => {
        if (data.data.authenticate !== null) {
          localStorage.setItem('jwt', data.data.authenticate.jwt)
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    $checkNested (obj, level, ...rest) {
      if (obj === undefined) return false
      if (rest.length === 0 && Object.prototype.hasOwnProperty.call(obj, level)) return true
      return this.checkNested(obj[level], ...rest)
    },
    $jwtDecode (f) {
      if (typeof window !== 'undefined') {
        const jwt = localStorage.getItem('jwt')

        if (jwt !== null) {
          const jwtDecoded = decode(jwt)

          f(jwt, jwtDecoded)
        }
      }
    },
    $jwtRefresh (apolloProvider) {
      this.$jwtDecode((jwt, jwtDecoded) => {
        apolloProvider.defaultClient.mutate({
          mutation: JWT_REFRESH_MUTATION,
          variables: {
            id: jwtDecoded.id
          }
        }).then((data) => {
          if (data.data.jwtRefresh.jwt !== null) {
            localStorage.setItem('jwt', data.data.jwtRefresh.jwt)
          } else {
            this.$logOut(apolloProvider)
          }
        }).catch((error) => {
          console.error(error)
        })
      })
    },
    $logOut (apolloProvider) {
      localStorage.removeItem('jwt')

      const jwtAnonymous = localStorage.getItem('jwt_anonymous')

      if (jwtAnonymous !== null) {
        localStorage.setItem('jwt', jwtAnonymous)
        localStorage.removeItem('jwt_anonymous')

        this.$jwtRefresh(apolloProvider)
      }

      location.reload()
    },
    $objectClone (object) {
      const objectClone = JSON.parse(JSON.stringify(object))
      return objectClone
    },
    $removeTypename (object) {
      const objectClone = this.$objectClone(object)
      delete objectClone.__typename
      return objectClone
    },
    $removeItemFromArray (array, prop, value) {
      var i = 0

      while (i < array.length) {
        if (prop in array[i] && array[i][prop] === value) {
          array.splice(i, 1)
          break
        } else {
          i++
        }
      }
    }
  }
}
