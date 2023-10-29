import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

import type { UnionToTupleRecord } from '~/types/types'

export const SITE_NAME = 'maevsi'
export const SITE_URL =
  process.env.SITE_URL ||
  process.env.NUXT_PUBLIC_SITE_URL ||
  (process.env.HOST ? 'https' : 'http') +
    '://' +
    (process.env.HOST ||
      `${process.env.HOST || 'localhost'}:${process.env.PORT || '3000'}`)

const itemUi =
  'flex items-center focus:underline hover:underline group-hover:opacity-80 transition-all aria-[current]:font-bold'
export const BREADCRUMBS_UI = {
  ol: 'flex gap-2 text-gray-600 dark:text-gray-400',
  li: 'flex items-center whitespace-nowrap leading-loose group',
  item: {
    icon: 'h-5 w-5',
    iconWithLabel: 'mr-1',
    default: itemUi,
    current: itemUi,
    separator: 'ml-2 text-gray-400 dark:text-gray-600',
  },
}
export const CACHE_VERSION = '2EvuFKRRxT'
export const ITEMS_PER_PAGE = 10
export const ITEMS_PER_PAGE_LARGE = 100
export const JWT_ALGORITHM = 'RS256'
export const JWT_NAME = () =>
  `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}jwt`
export type LOCALE_CODES = 'en' | 'de'
export const LOCALES: LocaleObject[] &
  UnionToTupleRecord<'code', LOCALE_CODES, LocaleObject> = [
  {
    code: 'en',
    file: 'en.json',
    name: 'English',
    iso: 'en', // Will be used as catchall locale by default.
  },
  {
    code: 'de',
    file: 'de.json',
    name: 'Deutsch',
    iso: 'de',
  },
]
export const POLYFILLS = ['Promise', 'requestAnimationFrame']
export const POSTGRES_INTEGER_MAXIMUM = Math.pow(2, 31) - 1
export const REGEX_PHONE_NUMBER = /^\+(?:[0-9] ?){6,14}[0-9]$/
export const REGEX_SLUG = /^[-A-Za-z0-9]+$/
export const REGEX_UPPERCASE_NONE = /^[^A-Z]+$/
export const REGEX_URL_HTTPS = /^https:\/\//
export const REGEX_UUID =
  /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/
export const STATE_LOADING_IDS_NAME = 'loadingIds'
export const TIMEZONE_COOKIE_NAME = 'm_tz'
export const TITLE_TEMPLATE = ({
  siteName,
  title,
}: {
  siteName: string
  title?: string
}) => (title && title !== siteName ? `${title} · ${siteName}` : siteName)
export const TURNSTILE_HEADER_KEY = 'X-Turnstile-Key'
