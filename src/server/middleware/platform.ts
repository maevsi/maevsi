export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  const maevsiPlatformHeader = getHeader(event, 'maevsi-platform')

  if (maevsiPlatformHeader) {
    event.context.$platform = maevsiPlatformHeader
    setCookie(event, 'maevsi-platform', maevsiPlatformHeader, {
      httpOnly: true,
      sameSite: 'strict',
      secure: runtimeConfig.public.vio.isInProduction,
    })
    return
  }

  const maevsiPlatformCookie = getCookie(event, 'maevsi-platform')

  if (maevsiPlatformCookie) {
    event.context.$platform = maevsiPlatformCookie
  }
})
