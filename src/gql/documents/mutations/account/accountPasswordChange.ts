import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useAccountPasswordChangeMutation = () =>
  useMutation(
    graphql(`
      mutation accountPasswordChange(
        $passwordCurrent: String!
        $passwordNew: String!
      ) {
        accountPasswordChange(
          input: {
            passwordCurrent: $passwordCurrent
            passwordNew: $passwordNew
          }
        ) {
          clientMutationId
        }
      }
    `),
  )
