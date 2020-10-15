import { global } from './global'

export default (_context) => {
  return {
    httpEndpoint:
      typeof window === 'undefined'
        ? 'http://postgraphile:5000/graphql'
        : 'https://postgraphile.' +
          (process.env.GRIDSOME_STACK_DOMAIN || 'maevsi.test') +
          '/graphql',
    getAuth: () => {
      global.jwtDecode((jwt, jwtDecoded) => {
        if (jwtDecoded.exp > Math.floor(new Date() / 1000)) {
          return `Bearer ${jwt}`
        } else {
          console.warn('JWT expired.')
        }
      })
    },
  }
}
