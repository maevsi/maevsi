export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$i18n.onLanguageSwitched = (
    _oldLocale: string,
    newLocale: string
  ) => {
    const { $dayjs } = nuxtApp

    $dayjs.locale(newLocale)
  }
})
