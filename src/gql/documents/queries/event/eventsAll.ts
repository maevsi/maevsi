import { useQuery } from '@urql/vue'
import { graphql } from '~~/gql/generated'
import type { AllEventsQueryVariables } from '~~/gql/generated/graphql'

export const useAllEventsQuery = (variables: AllEventsQueryVariables) =>
  useQuery({
    query: graphql(`
      query allEvents($after: Cursor, $authorAccountId: UUID, $first: Int!) {
        allEvents(
          after: $after
          condition: { authorAccountId: $authorAccountId }
          first: $first
          orderBy: START_DESC
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
    `),
    variables,
  })
