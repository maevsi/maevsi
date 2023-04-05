import { useMutation } from '@urql/vue'
import { graphql } from '~/gql/generated'

export const useAccountRegistrationRefreshMutation = () =>
  useMutation(
    graphql(`
      mutation accountRegistrationRefresh(
        $username: String!
        $language: String!
      ) {
        accountRegistrationRefresh(
          input: { language: $language, username: $username }
        ) {
          clientMutationId
        }
      }
    `)
  )
