import fs from 'node:fs'

import type { H3Event } from 'h3'
import { decodeJwt, jwtVerify, importSPKI } from 'jose'

export const useVerifyAuth = async () => {
  const event = useEvent()
  const jwtPublicKey = await useJwtPublicKey()

  if (!jwtPublicKey) {
    return throwError({
      code: 500,
      message: 'The JSON web token public key is missing!',
    })
  }

  return async () => await verifyAuth(event, jwtPublicKey)
}

const verifyAuth = async (event: H3Event, jwtPublicKey: string) => {
  const headerAuthorization = getRequestHeader(event, 'authorization')

  if (!headerAuthorization) {
    return throwError({
      code: 401,
      message: 'The request header "Authorization" is missing!',
    })
  }

  const jwt = headerAuthorization.substring(7)

  try {
    jwtVerify(jwt, await importSPKI(jwtPublicKey, JWT_ALGORITHM), {
      algorithms: [JWT_ALGORITHM],
      audience: 'postgraphile',
      issuer: 'postgraphile',
    })
  } catch (error) {
    return throwError({
      code: 401,
      message: `JSON web token verification failed${error instanceof Error ? `: ${error.message}` : '.'}`,
    })
  }

  return decodeJwt(jwt)
}

export const useJwtPublicKey = async () => {
  const runtimeConfig = useRuntimeConfig()
  const jwtPublicKeyPath = process.env.POSTGRAPHILE_JWT_PUBLIC_KEY_FILE

  if (runtimeConfig.public.vio.stagingHost) {
    return await $fetch<string>(
      `https://${runtimeConfig.public.vio.stagingHost}/api/auth-key`,
    )
  } else {
    return jwtPublicKeyPath && fs.existsSync(jwtPublicKeyPath)
      ? fs.readFileSync(jwtPublicKeyPath, 'utf-8')
      : undefined
  }
}
