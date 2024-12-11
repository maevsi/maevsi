import type { CombinedError } from '@urql/core'
import { consola } from 'consola'

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
