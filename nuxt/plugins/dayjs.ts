import dayjs from 'dayjs'

// workaround for [1]
import de from 'dayjs/locale/de'
// import 'dayjs/locale/de' does not make locale available

import duration from 'dayjs/plugin/duration'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

export default defineNuxtPlugin((_nuxtApp) => {
  dayjs.extend(duration)
  dayjs.extend(isSameOrAfter)
  dayjs.extend(localizedFormat)
  dayjs.extend(relativeTime)
  dayjs.extend(timezone)
  dayjs.extend(utc)

  // workaround for [1]
  dayjs.locale(de)
  // moment.locale(en) makes `format` error

  return {
    provide: {
      dayjs,
    },
  }
})

/*
  [1]
  https://github.com/nuxt/framework/issues/7534#issuecomment-1248596609
  https://github.com/nuxt/framework/issues/7206
  https://github.com/maevsi/maevsi/issues/956
*/
