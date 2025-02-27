import { useQuery } from '@urql/vue'
import { graphql } from '~~/gql/generated'
import type { AllGuestsQueryVariables } from '~~/gql/generated/graphql'

export const useAllGuestsQuery = (variables: AllGuestsQueryVariables) =>
  useQuery({
    query: allGuestsQuery,
    variables,
  })

export const allGuestsQuery = graphql(`
  query allGuests($after: Cursor, $eventId: UUID!, $first: Int!) {
    allGuests(after: $after, condition: { eventId: $eventId }, first: $first) {
      nodes {
        ...GuestItem
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`)
