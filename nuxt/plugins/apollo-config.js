import cookie from 'cookie'

export default ({ req, store }) => {
  return {
    httpEndpoint: process.server
      ? 'http://postgraphile:5000/graphql'
      : 'https://postgraphile.' +
        (process.env.NUXT_STACK_DOMAIN || 'maevsi.test') +
        '/graphql',
    getAuth: (tokenName) => {
      let jwt = store.state.jwt

      if (process.server) {
        // Server.
        if (req.headers.cookie) {
          const cookies = cookie.parse(req.headers.cookie)

          if (cookies[tokenName]) {
            jwt = cookies[tokenName]
          }
        }
      } else {
        // Client.
        jwt = store.state.jwt
      }

      if (jwt !== null) {
        // Jwt isn't expired.
        return `Bearer ${jwt}`
      }

      // else
      console.warn('No authentication.')
      return ''
    },
  }
}
