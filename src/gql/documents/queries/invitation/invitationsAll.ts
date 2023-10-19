import { useQuery } from '@urql/vue'
import { graphql } from '~/gql/generated'
import type { AllInvitationsQueryVariables } from '~/gql/generated/graphql'

export const useAllInvitationsQuery = (
  variables: AllInvitationsQueryVariables,
) =>
  useQuery({
    query: graphql(`
      query allInvitations($after: Cursor, $eventId: UUID!, $first: Int!) {
        allInvitations(
          after: $after
          condition: { eventId: $eventId }
          first: $first
        ) {
          nodes {
            ...InvitationItem
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
