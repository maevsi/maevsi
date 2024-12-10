import { useQuery } from '@urql/vue'
import { graphql } from '~~/gql/generated'
import type { AllContactsQueryVariables } from '~~/gql/generated/graphql'

export const useAllContactsQuery = (variables: AllContactsQueryVariables) =>
  useQuery({
    query: graphql(`
      query allContacts($after: Cursor, $authorAccountId: UUID, $first: Int!) {
        allContacts(
          after: $after
          condition: { authorAccountId: $authorAccountId }
          first: $first
          orderBy: [FIRST_NAME_ASC, LAST_NAME_ASC]
        ) {
          nodes {
            ...ContactItem
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
