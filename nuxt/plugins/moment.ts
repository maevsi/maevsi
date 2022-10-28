import moment from 'moment'

import 'moment/locale/de'

export default defineNuxtPlugin((_nuxtApp) => {
  return {
    provide: {
      moment,
    },
  }
})
