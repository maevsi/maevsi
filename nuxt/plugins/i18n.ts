import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { $moment } = nuxtApp

  nuxtApp.$i18n.onLanguageSwitched = (
    _oldLocale: string,
    newLocale: string
  ) => {
    $moment.locale(newLocale)
  }
})
