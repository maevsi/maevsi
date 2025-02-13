import type { H3Event } from 'h3'

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
    return (await verifyJwt({ jwt, jwtPublicKey })).payload
  } catch (error) {
    return throwError({
      code: 401,
      message: `JSON web token verification failed${error instanceof Error ? `: ${error.message}` : '.'}`,
    })
  }
}
