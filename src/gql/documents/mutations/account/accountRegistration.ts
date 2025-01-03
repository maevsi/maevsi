import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useAccountRegistrationMutation = () =>
  useMutation(
    graphql(`
      mutation accountRegistration(
        $emailAddress: String!
        $password: String!
        $username: String!
        $language: String!
      ) {
        accountRegistration(
          input: {
            emailAddress: $emailAddress
            password: $password
            username: $username
            language: $language
          }
        ) {
          clientMutationId
          uuid
        }
      }
    `),
  )
