import localeDe from './locales/de.json'
import localeEn from './locales/en.json'

export default defineI18nConfig((_nuxt) => ({
  messages: {
    de: localeDe,
    en: localeEn,
  },
  fallbackWarn: false, // TODO: don't show incorrect warnings (https://github.com/intlify/vue-i18n-next/issues/776)
}))
