export default defineEventHandler(async (event) => {
  const maevsiPlatformHeader = getHeader(event, 'maevsi-platform')

  if (maevsiPlatformHeader) {
    event.context.$platform = maevsiPlatformHeader
    return
  }
})
