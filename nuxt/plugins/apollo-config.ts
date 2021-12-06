import { Context } from '@nuxt/types'
import consola from 'consola'

export default ({ store }: Context) => {
  return {
    httpEndpoint: process.server
      ? 'http://postgraphile:5000/graphql'
      : 'https://postgraphile.' +
        (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
        '/graphql',
    getAuth: (_tokenName: string) => {
      const jwt = store.state.jwt

      if (jwt) {
        consola.trace('Apollo request authenticated with: ' + jwt)
        return `Bearer ${jwt}`
      } else {
        consola.trace('Apollo request without authentication.')
        return ''
      }
    },
  }
}
