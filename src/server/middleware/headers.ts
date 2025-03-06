export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig()

  appendHeader(
    event,
    'NEL',
    '\'{"report_to":"default","max_age":31536000,"include_subdomains":true}\'',
  )
  appendHeader(
    event,
    'Report-To',
    `'{"group":"default","max_age":31536000,"endpoints":[{"url":"https://${runtimeConfig.public.sentry.host}/api/${runtimeConfig.public.sentry.project.id}/security/?sentry_key=${runtimeConfig.public.sentry.project.publicKey}&sentry_environment=${runtimeConfig.public.vio.environment}&sentry_release=${runtimeConfig.public.vio.releaseName}"}],"include_subdomains":true}'`,
  )
})
