import { NuxtApp } from '@nuxt/types-edge/app'
import VueI18n from '@nuxtjs/i18n/types'
import { IVueI18n } from 'vue-i18n'

declare module 'vue/types/vue' {
  interface Vue {
    app: NuxtApp
    readonly i18n: VueI18n & IVueI18n
  }
}
