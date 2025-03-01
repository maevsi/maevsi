import { useQuery } from '@urql/vue'
import { graphql } from '~~/gql/generated'
import type { Language } from '~~/gql/generated/graphql'
import { computed } from 'vue'

export const useEventSearchQuery = (
  variablesFn: () => { query: string; language: Language },
  options?: { pause: globalThis.ComputedRef<boolean> },
) => {
  const variables = computed(() => variablesFn())
  return useQuery({
    query: eventSearchQuery,
    variables,
    pause: options?.pause,
  })
}

export const eventSearchQuery = graphql(`
  query eventSearch($query: String!, $language: Language!) {
    eventSearch(query: $query, language: $language) {
      nodes {
        ...EventItem
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`)
