import { useQuery } from '@urql/vue'
import { graphql } from '~/gql/generated'
import { ProfilePictureByAccountIdQueryVariables } from '~/gql/generated/graphql'

export const useProfilePictureByAccountIdQuery = (
  variables: ProfilePictureByAccountIdQueryVariables,
) =>
  useQuery({
    query: graphql(`
      query profilePictureByAccountId($accountId: UUID!) {
        profilePictureByAccountId(accountId: $accountId) {
          ...ProfilePictureItem
        }
      }
    `),
    variables,
  })
