import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useInviteMutation = () =>
  useMutation(
    graphql(`
      mutation invite($invitationId: UUID!, $language: String!) {
        invite(input: { invitationId: $invitationId, language: $language }) {
          clientMutationId
        }
      }
    `),
  )
