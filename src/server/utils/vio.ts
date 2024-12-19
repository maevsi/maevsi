export const useSiteUrl = () => useRuntimeConfig().public.site.url
export const useSiteUrlTyped = () => new URL(useSiteUrl())
