import { useQuery } from '@urql/vue'
import { graphql } from '~/gql/generated'
import { AllUploadsQueryVariables } from '~/gql/generated/graphql'

export const useAllUploadsQuery = (variables: AllUploadsQueryVariables) =>
  useQuery({
    query: graphql(`
      query allUploads($after: Cursor, $first: Int!, $username: String) {
        allUploads(
          after: $after
          condition: { username: $username }
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
