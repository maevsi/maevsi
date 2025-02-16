export default defineEventHandler(async (event) => {
  const { setJwtCookie, verifyJwt } = await useJsonWebToken()

  const headerAuthorization = getRequestHeader(event, 'authorization')
  let jwt = ''

  if (headerAuthorization) {
    jwt = headerAuthorization.substring(7)

    if (process.env.NODE_ENV === 'production') {
      await verifyJwt(jwt)
    }
  }

  setJwtCookie(jwt)
})
