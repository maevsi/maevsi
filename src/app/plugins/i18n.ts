export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('i18n:localeSwitched', ({ newLocale }) => {
    nuxtApp.vueApp.$nuxt.$dayjs.locale(newLocale)
  })
})
