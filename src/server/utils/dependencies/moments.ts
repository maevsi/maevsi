import moment from 'moment-timezone'

interface MomentFormatOptionsBase {
  format: string
  locale: string
}

interface DateFormatOptions extends MomentFormatOptionsBase {
  input: string
}

interface DurationFormatOptions extends MomentFormatOptionsBase {
  start: string
  end: string
}

export const MOMENT_FORMAT = 'LL LT'
export const momentFormatDate = (options: DateFormatOptions) => {
  moment.locale(options.locale)
  return moment.utc(options.input).format(options.format)
}
export const momentFormatDuration = (options: DurationFormatOptions) => {
  moment.locale(options.locale)
  return moment
    .duration(moment(options.end).diff(moment(options.start)))
    .humanize()
}
