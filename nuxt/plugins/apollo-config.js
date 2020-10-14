export default (_context) => {
  return {
    httpEndpoint:
      'https://postgraphile.' +
      (process.env.GRIDSOME_STACK_DOMAIN || 'maevsi.test') +
      '/graphql',
    getAuth: () => {
      global.methods.$jwtDecode((jwt, jwtDecoded) => {
        if (jwtDecoded.exp > Math.floor(new Date() / 1000)) {
          return `Bearer ${jwt}`
        } else {
          console.warn('JWT expired.')
        }
      })
    },
  }
}
