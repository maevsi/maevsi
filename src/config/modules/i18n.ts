import type { NuxtI18nOptions } from '@nuxtjs/i18n'
import type { DefineNuxtConfig } from 'nuxt/config'

import { LOCALES } from '../../utils/constants'

export const MODULE_CONFIG = {
  defaultLocale: 'en', // Must be set for the default prefix_except_default prefix strategy.
  detectBrowserLanguage: false,
  lazy: true,
  locales: LOCALES,
}

export const i18nConfig: ReturnType<DefineNuxtConfig> = {
  i18n: MODULE_CONFIG as NuxtI18nOptions,
}
