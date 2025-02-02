export default defineEventHandler(async (event) => {
  const jwtPublicKey = await useJwtPublicKey()

  if (!jwtPublicKey) {
    return throwError({
      code: 500,
      message: 'The authentication key is not available!',
    })
  }

  setResponseHeader(event, 'content-type', 'text/plain')
  return jwtPublicKey
})
