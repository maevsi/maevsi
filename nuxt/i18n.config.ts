import localeDe from './locales/de.json'
import localeEn from './locales/en.json'

export default defineI18nConfig(() => ({
  messages: {
    de: localeDe,
    en: localeEn,
  },
  fallbackWarn: false, // covered by linting
  missingWarn: false, // covered by linting
}))
