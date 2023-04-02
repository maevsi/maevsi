import { useQuery } from '@urql/vue'
import { graphql } from '~/gql/generated'
import { ProfilePictureByUsernameQueryVariables } from '~/gql/generated/graphql'

export const useProfilePictureByUsernameQuery = (
  variables: ProfilePictureByUsernameQueryVariables
) =>
  useQuery({
    query: graphql(`
      query profilePictureByUsername($username: String!) {
        profilePictureByUsername(username: $username) {
          ...ProfilePictureItem
        }
      }
    `),
    variables,
  })
