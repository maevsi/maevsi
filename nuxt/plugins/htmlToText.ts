import { htmlToText } from 'html-to-text'
import { Inject } from '@nuxt/types/app'
import { Context } from '@nuxt/types'

export default (_: Context, inject: Inject) => {
  inject('htmlToText', htmlToText)
}

declare module 'vue/types/vue' {
  interface Vue {
    $htmlToText: typeof htmlToText
  }
}
