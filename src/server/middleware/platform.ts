export default defineEventHandler(async (event) => {
  const appPlatformHeader = getHeader(event, `${SITE_NAME}-platform`)

  if (appPlatformHeader) {
    event.context.$platform = appPlatformHeader
    return
  }
})
