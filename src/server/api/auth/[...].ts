// see https://github.com/Hebilicious/authjs-nuxt/blob/main/docs/nuxt-configuration.md#%EF%B8%8F-route-configuration

import GithubProvider from '@auth/core/providers/github'
import type { AuthConfig } from '@auth/core/types'
import { NuxtAuthHandler } from '#auth'
import { Provider } from '@auth/core/providers'
import { Adapter } from '@auth/core/adapters'
import consola from 'consola'

// The #auth virtual import comes from this module. You can use it on the client
// and server side, however not every export is universal. For example do not
// use sign-in and sign-out on the server side.
// comment Omar: well, other imports from #auth atleast ... NuxtAuthHandler obviously not...

const runtimeConfig = useRuntimeConfig()

// Refer to Auth.js docs for more details
const providers: Provider[] = []

if (runtimeConfig.oauth.github.clientId) {
  providers.push(
    GithubProvider({
      clientId: runtimeConfig.oauth.github.clientId,
      clientSecret: runtimeConfig.oauth.github.clientSecret,
    }),
  )
}

const maevsiAdapter: Adapter = {
  createUser(user) {
    consola.info('create user', user)
    return {
      maevsiUserId: '5df32eea-74f9-4d53-88e9-90aa1752940d',
      ...user,
    }
  },
  getUser(id) {
    consola.info('get user by id', id)
    return null
  },
  getUserByAccount(providerAccountId) {
    consola.info('get user by provider account', providerAccountId)
    return null
  },
  getUserByEmail(email) {
    consola.info('get user by email', email)
    return null
  },
  updateUser(user) {
    consola.info('update user', user)
    return {
      email: 'no@example.org',
      emailVerified: null,
      ...user,
    }
  },
  linkAccount(account) {
    consola.info('link account', account)
    return account
  },
}

export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  adapter: maevsiAdapter,
  session: {
    strategy: 'jwt',
  },
  providers,
  // https://stackoverflow.com/questions/64576733/where-and-how-to-change-session-user-object-after-signing-in
  callbacks: {
    jwt({ token, user }) {
      consola.info('jwt callback', token, user)
      user && (token.user = user)
      return token
    },
    session({ session, token }) {
      consola.info('session callback', session, token)
      session.user = token.user
      return session
    },
  },
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
// If you don't want to pass the full runtime config,
//  you can pass something like this: { public: { authJs: { baseUrl: "" } } }
