// https://github.com/nuxt/bridge/discussions/404#discussioncomment-3178164

import VueI18n from '@nuxtjs/i18n/types'
import { Path, Values, Locale } from 'vue-i18n/types'

/**
 * Overloads VueI18n interface to avoid needing to cast return value to string.
 * @see https://github.com/kazupon/vue-i18n/issues/410
 */
declare module '@nuxtjs/i18n/types' {
  export default class VueI18n {
    t(key: Path, locale: Locale, values?: Values): string
    // eslint-disable-next-line no-dupe-class-members
    t(key: Path, values?: Values): string
    tc(key: Path, number?: number): string
  }
}

declare module 'vue-i18n/types' {
  export default class VueI18n {
    t(key: Path, locale: Locale, values?: Values): string
    // eslint-disable-next-line no-dupe-class-members
    t(key: Path, values?: Values): string
    tc(key: Path, number?: number): string
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $t: typeof VueI18n.prototype.t
    $tc: typeof VueI18n.prototype.tc
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface VueConstructor<V extends Vue = Vue> {
    i18n: typeof VueI18n.prototype
  }
}

export default VueI18n
