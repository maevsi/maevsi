import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useAccountPasswordResetMutation = () =>
  useMutation(
    graphql(`
      mutation accountPasswordReset($code: UUID!, $password: String!) {
        accountPasswordReset(input: { code: $code, password: $password }) {
          clientMutationId
        }
      }
    `),
  )
