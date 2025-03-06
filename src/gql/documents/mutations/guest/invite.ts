import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useInviteMutation = () =>
  useMutation(
    graphql(`
      mutation invite($guestId: UUID!, $language: String!) {
        invite(input: { guestId: $guestId, language: $language }) {
          clientMutationId
        }
      }
    `),
  )
