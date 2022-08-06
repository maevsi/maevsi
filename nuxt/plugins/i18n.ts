import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { app, $moment } = nuxtApp.nuxt2Context

  app.i18n.onLanguageSwitched = (_oldLocale, newLocale) => {
    $moment.locale(newLocale)
  }
})
