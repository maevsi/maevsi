import { useQuery } from '@urql/vue'
import { graphql } from '~~/gql/generated'
import type { AllUploadsQueryVariables } from '~~/gql/generated/graphql'

export const useAllUploadsQuery = (variables: AllUploadsQueryVariables) =>
  useQuery({
    query: graphql(`
      query allUploads($after: Cursor, $first: Int!, $accountId: UUID) {
        allUploads(
          after: $after
          condition: { accountId: $accountId }
          first: $first
        ) {
          nodes {
            ...UploadItem
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
