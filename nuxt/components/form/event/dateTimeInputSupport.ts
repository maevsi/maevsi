import { DateTime } from 'luxon'
import { Ref } from 'vue'

const DEFAULT_FORMAT = DateTime.DATETIME_SHORT

export function stringcronizedDate(ref: Ref<string | undefined>) {
  return computed<DateTime | undefined>({
    get: () =>
      ref.value !== undefined ? DateTime.fromISO(ref.value) : undefined,
    set: (dt: DateTime | undefined) => {
      ref.value = dt !== undefined ? dt.toISO() : undefined
    },
  })
}

export function useDateTimeInput(value: Ref<DateTime | undefined>) {
  return {
    value,
    formInput: {
      type: 'text',
      isReadonly: true,
      valueFormatter: (dt: DateTime | undefined) =>
        dt !== undefined ? dt.toLocaleString(DEFAULT_FORMAT) : undefined,
    },
  }
}
