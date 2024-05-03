export default defineEventHandler(async (event) => {
  deleteCookie(event, 'maevsi-platform') // TODO: remove after some time, this is only for migration

  const maevsiPlatformHeader = getHeader(event, 'maevsi-platform')

  if (maevsiPlatformHeader) {
    event.context.$platform = maevsiPlatformHeader
    return
  }
})
