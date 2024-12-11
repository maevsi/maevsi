import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useAccountEmailAddressVerificationMutation = () =>
  useMutation(
    graphql(`
      mutation accountEmailAddressVerification($code: UUID!) {
        accountEmailAddressVerification(input: { code: $code }) {
          clientMutationId
        }
      }
    `),
  )
