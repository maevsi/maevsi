import { useQuery } from '@urql/vue'
import { graphql } from '~/gql/generated'
import { AllEventsQueryVariables } from '~/gql/generated/graphql'

export const useAllEventsQuery = (variables: AllEventsQueryVariables) =>
  useQuery({
    query: graphql(`
      query allEvents($after: Cursor, $authorUsername: String, $first: Int!) {
        allEvents(
          after: $after
          condition: { authorUsername: $authorUsername }
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
