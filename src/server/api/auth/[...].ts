// see https://github.com/Hebilicious/authjs-nuxt/blob/main/docs/nuxt-configuration.md#%EF%B8%8F-route-configuration

import GithubProvider from '@auth/core/providers/github'
import type { AuthConfig } from '@auth/core/types'
import { NuxtAuthHandler } from '#auth'
import { Provider } from '@auth/core/providers'

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

export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  providers,
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
// If you don't want to pass the full runtime config,
//  you can pass something like this: { public: { authJs: { baseUrl: "" } } }
