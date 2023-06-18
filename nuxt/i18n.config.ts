import localeDe from './locales/de.json'
import localeEn from './locales/en.json'

export default defineI18nConfig(() => ({
  messages: {
    de: localeDe,
    en: localeEn,
  },
  fallbackWarn: false,
  missingWarn: false,
}))
