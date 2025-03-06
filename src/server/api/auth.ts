export default defineEventHandler(async (event) => {
  const { setJwtCookie, verifyJwt } = await useJsonWebToken()

  const headerAuthorization = getRequestHeader(event, 'authorization')
  if (!headerAuthorization) return

  const jwt = headerAuthorization.substring(7)
  await verifyJwt(jwt)
  setJwtCookie(jwt)
})
