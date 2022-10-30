import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

export function CYPRESS_BASE_URL(env: string) {
  return `http${env === 'production' ? '' : 's'}://0.0.0.0:3000`
}

export const LOCALES: LocaleObject[] = [
  {
    code: 'en',
    name: 'English',
    iso: 'en', // Will be used as catchall locale by default.
  },
  {
    code: 'de',
    name: 'Deutsch',
    iso: 'de',
  },
]
export const SITEMAP_EXCLUSIONS = ['/%F0%9F%AB%96']
export const SITEMAP_EXCLUSIONS_LOCALIZED: string[] = []

export const ITEMS_PER_PAGE = 8
export const ITEMS_PER_PAGE_LARGE = 100
export const JWT_ALGORITHM = 'RS256'
export const JWT_NAME = '__Secure-jwt'
