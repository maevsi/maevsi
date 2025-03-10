import type { useServerSeoMeta } from '@unhead/vue'

export default defineAppConfig({
  vio: {
    pages: undefined,
    seoMeta: {
      twitterSite: '@maev_si',
    },
    themeColor: THEME_COLOR,
  },
})

declare module 'nuxt/schema' {
  interface AppConfigInput {
    vio: {
      pages?: {
        legalNotice?: {
          contact: {
            email: string
          }
          responsibility: {
            address: {
              city: string
              name: string
              street: string
            }
          }
          tmg: {
            address: {
              city: string
              name: string
              street: string
            }
          }
        }
        privacyPolicy?: {
          hostingCdn?: {
            external: {
              address: {
                city: string
                name: string
                street: string
              }
            }
          }
          mandatoryInfo?: {
            responsible: {
              address: {
                city: string
                email: string
                name: string
                street: string
              }
            }
          }
        }
      }
      seoMeta?: Parameters<typeof useServerSeoMeta>[0]
      themeColor?: string
    }
  }
}
