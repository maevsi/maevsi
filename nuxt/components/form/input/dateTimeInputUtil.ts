import { DateTime } from 'luxon'
import { Ref } from 'vue'

const DEFAULT_FORMAT = DateTime.DATETIME_SHORT

export function useDateTimeInput(value: Ref<DateTime | undefined>) {
  return {
    value,
    formatted: computed(() =>
      value.value !== undefined
        ? value.value.toLocaleString(DEFAULT_FORMAT)
        : undefined
    ),
    formInput: {
      type: 'text',
      isReadonly: true,
    },
  }
}
