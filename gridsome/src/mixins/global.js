import gql from 'graphql-tag'
import jwtDecode from 'jwt-decode'

export default {
  data () {
    return {
      ITEMS_PER_PAGE: 10
    }
  },
  methods: {
    $authenticateAnonymous (apolloProvider) {
      apolloProvider.defaultClient.mutate({
        mutation: gql`mutation ($username: String!, $password: String!) {
          authenticate(input: {username: $username, password: $password}) {
            jwt
          }
        }`,
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
      const jwt = localStorage.getItem('jwt')

      if (jwt !== null) {
        const jwtDecoded = jwtDecode(jwt)

        f(jwt, jwtDecoded)
      }
    },
    $jwtRefresh (apolloProvider) {
      this.$jwtDecode((jwt, jwtDecoded) => {
        apolloProvider.defaultClient.mutate({
          mutation: gql`mutation ($id: UUID!) {
            jwtRefresh(input: {jwtId: $id}) {
              jwt
            }
          }`,
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
      } else {
        this.$authenticateAnonymous(apolloProvider)
      }
    },
    $objectClone (object) {
      const objectClone = JSON.parse(JSON.stringify(object))
      return objectClone
    },
    $removeTypename (object) {
      const objectClone = this.$objectClone(object)
      delete objectClone.__typename
      return objectClone
    }
  }
}
