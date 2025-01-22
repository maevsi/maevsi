import { jwtVerify, importSPKI } from 'jose'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const jwtPublicKey = await useJwtPublicKey()

  const headerAuthorization = getRequestHeader(event, 'authorization')
  let jwt = ''

  if (headerAuthorization) {
    jwt = headerAuthorization.substring(7)

    // TODO: decide whether to use the following if / to fetch the authentication key from staging (https://github.com/maevsi/maevsi/issues/916)
    if (process.env.NODE_ENV === 'production') {
      if (!jwtPublicKey) {
        return throwError({
          code: 500,
          message: 'Secret missing!',
        })
      }

      try {
        await jwtVerify(jwt, await importSPKI(jwtPublicKey, JWT_ALGORITHM), {
          algorithms: [JWT_ALGORITHM],
          audience: 'postgraphile',
          issuer: 'postgraphile',
        })
      } catch (error) {
        return throwError({
          code: 401,
          message: `Json web token verification failed${error instanceof Error ? `: ${error.message}` : '.'}`,
        })
      }
    }
  }

  setCookie(event, JWT_NAME(), jwt, {
    expires: jwt ? new Date(Date.now() + 86400 * 1000 * 31) : new Date(0),
    httpOnly: true,
    // path: '/',
    sameSite: 'lax', // Cannot be 'strict' to allow authentications after clicking on links within webmailers.
    secure: runtimeConfig.public.vio.isInProduction,
  })
})
