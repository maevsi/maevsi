import { defu } from 'defu'
import type { NuxtOptions } from 'nuxt/schema'

// remove invalid `'none'`s and duplicates
export const cleanupCsp = (
  nuxtSecurityConfiguration: Partial<NuxtOptions['security']>,
) => {
  if (
    nuxtSecurityConfiguration.headers &&
    typeof nuxtSecurityConfiguration.headers !== 'boolean' &&
    nuxtSecurityConfiguration.headers.contentSecurityPolicy
  ) {
    const csp = nuxtSecurityConfiguration.headers.contentSecurityPolicy

    for (const [key, value] of Object.entries(csp)) {
      if (!Array.isArray(value)) continue

      const valueFiltered = value.filter((x) => x !== "'none'")

      if (valueFiltered.length) {
        ;(csp as Record<string, unknown>)[key] = [...new Set(valueFiltered)]
      }
    }
  }

  return nuxtSecurityConfiguration
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('nuxt-security:routeRules', async (routeRules) => {
    const runtimeConfig = useRuntimeConfig()
    const { siteUrlTyped: siteUrl } = useSiteUrl()

    routeRules['/**'] = cleanupCsp(
      defu(
        {
          headers: {
            contentSecurityPolicy: GET_CSP({
              siteUrl,
              runtimeConfig,
            }),
          },
        },
        routeRules['/**'],
      ),
    )

    if (runtimeConfig.public.security.isRateLimiterDisabled) {
      routeRules['/**'] = defu(
        {
          rateLimiter: false,
        },
        routeRules['/**'],
      )
    }
  })
})
