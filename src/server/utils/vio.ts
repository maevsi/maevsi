export const useServerSiteUrl = () => {
  const runtimeConfig = useRuntimeConfig()

  return new URL(runtimeConfig.public.site.url)
}
