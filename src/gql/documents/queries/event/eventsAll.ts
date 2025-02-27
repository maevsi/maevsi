import { useQuery } from '@urql/vue'
import { graphql } from '~~/gql/generated'
import type { AllEventsQueryVariables } from '~~/gql/generated/graphql'

export const useAllEventsQuery = (variables: AllEventsQueryVariables) =>
  useQuery({
    query: graphql(`
      query allEvents($after: Cursor, $createdBy: UUID, $first: Int!) {
        allEvents(
          after: $after
          condition: { createdBy: $createdBy }
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
