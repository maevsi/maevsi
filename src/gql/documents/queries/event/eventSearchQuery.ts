import { useQuery, type UseQueryArgs } from '@urql/vue'
import { graphql } from '~~/gql/generated'
import type { EventSearchQueryVariables } from '~~/gql/generated/graphql'

export const useEventSearchQuery = (
  variables: MaybeRefObj<EventSearchQueryVariables>,
  args?: Partial<UseQueryArgs>,
) =>
  useQuery({
    query: eventSearchQuery,
    variables,
    ...args,
  })

export const eventSearchQuery = graphql(`
  query eventSearch(
    $after: Cursor
    $first: Int!
    $language: Language
    $query: String
  ) {
    eventSearch(
      after: $after
      first: $first
      language: $language
      query: $query
    ) {
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
