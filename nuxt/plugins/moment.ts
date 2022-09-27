import moment from 'moment'

import 'moment/locale/de'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  return {
    provide: {
      moment,
    },
  }
})
