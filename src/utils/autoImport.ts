import type { CombinedError } from '@urql/core'
import { consola } from 'consola'

import type { ArrayElement, UnionToIntersection } from '~/types/types'
import type { BackendError } from '~/types/api'

export const getApiData = <
  S,
  T extends {
    data: Ref<S>
    error: Ref<CombinedError | undefined>
    fetching: Ref<boolean>
  },
>(
  queries?: Array<T | undefined>,
) => {
  const apiData = computed(() => ({
    data: (queries || []).reduce(
      (p, c) => ({ ...p, ...c?.data.value }),
      {} as NonNullable<
        UnionToIntersection<NonNullable<ArrayElement<T[]>['data']['value']>>
      >,
    ),
    errors: (queries || []).reduce(
      (p, c) => (c?.error.value ? [...p, c.error.value as BackendError] : p),
      [] as BackendError[],
    ),
    isFetching: (queries || []).reduce(
      (p, c) => p || c?.fetching.value || false,
      false,
    ),
  }))

  watch(
    () => apiData.value.errors,
    (current, previous) => {
      current
        .filter((error) => !previous.includes(error))
        .forEach((error) => consola.error(error))
    },
  )

  return apiData
}

export const getTimezone = () =>
  useNuxtApp().ssrContext?.event.context.$timezone ||
  useCookie(TIMEZONE_COOKIE_NAME, {
    httpOnly: false,
    sameSite: 'strict',
    secure: useRuntimeConfig().public.vio.isInProduction,
  }).value ||
  (import.meta.client
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : undefined)

export const zalgo = async <T>(maybePromise: T) =>
  import.meta.server ? await maybePromise : maybePromise
