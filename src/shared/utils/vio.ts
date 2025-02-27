export const useSiteUrl = () => {
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = runtimeConfig.public.site?.url

  return {
    siteUrl,
    siteUrlTyped: new URL(siteUrl),
  }
}
