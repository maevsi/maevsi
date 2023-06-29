import { useQuery } from '@urql/vue'
import { graphql } from '~/gql/generated'
import { AllContactsQueryVariables } from '~/gql/generated/graphql'

export const useAllContactsQuery = (variables: AllContactsQueryVariables) =>
  useQuery({
    query: graphql(`
      query allContacts(
        $after: Cursor
        $authorAccountUsername: String
        $first: Int!
      ) {
        allContacts(
          after: $after
          condition: { authorAccountUsername: $authorAccountUsername }
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
