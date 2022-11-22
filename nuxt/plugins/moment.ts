import moment from 'dayjs'
import 'dayjs/locale/de'
import duration from 'dayjs/plugin/duration'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

export default defineNuxtPlugin((_nuxtApp) => {
  moment.extend(duration)
  moment.extend(isSameOrAfter)
  moment.extend(localizedFormat)
  moment.extend(relativeTime)

  return {
    provide: {
      moment,
    },
  }
})
