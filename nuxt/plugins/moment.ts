import moment from 'dayjs'

// workaround for [1]
import de from 'dayjs/locale/de'
// import 'dayjs/locale/de' does not make locale available

import duration from 'dayjs/plugin/duration'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

export default defineNuxtPlugin((_nuxtApp) => {
  moment.extend(duration)
  moment.extend(isSameOrAfter)
  moment.extend(localizedFormat)
  moment.extend(relativeTime)

  // workaround for [1]
  moment.locale(de)
  // moment.locale(en) makes `format` error

  return {
    provide: {
      moment,
    },
  }
})

/*
  [1]
  https://github.com/nuxt/framework/issues/7534#issuecomment-1248596609
  https://github.com/nuxt/framework/issues/7206
  https://github.com/maevsi/maevsi/issues/956
*/
