import fs from 'node:fs'

import type { H3Event } from 'h3'
import { decodeJwt, jwtVerify, importSPKI } from 'jose'

// const configPostgraphileJwtPublicKeyPath =
//   process.env.POSTGRAPHILE_JWT_PUBLIC_KEY_FILE || ''
// const configPostgraphileJwtPublicKey = fs.existsSync(
//   configPostgraphileJwtPublicKeyPath,
// )
//   ? fs.readFileSync(configPostgraphileJwtPublicKeyPath, 'utf-8')
//   : undefined

export const verifyAuth = async (event: H3Event) => {
  const {
    node: { req },
  } = event
  const jwtPublicKey = await useJwtPublicKey()

  if (!req.headers.authorization) {
    return throwError({
      code: 401,
      message: 'The request header "Authorization" is missing!',
    })
  }

  if (!jwtPublicKey) {
    return throwError({
      code: 500,
      message: 'The JSON web token public key is missing!',
    })
  }

  const jwt = req.headers.authorization.substring(7)

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
