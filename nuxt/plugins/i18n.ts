import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { $moment } = nuxtApp.nuxt2Context

  nuxtApp.$i18n.onLanguageSwitched = (
    _oldLocale: string,
    newLocale: string
  ) => {
    $moment.locale(newLocale)
  }
})
