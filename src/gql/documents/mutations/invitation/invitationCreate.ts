import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useCreateInvitationMutation = () =>
  useMutation(
    graphql(`
      mutation createInvitation($invitationInput: InvitationInput!) {
        createInvitation(input: { invitation: $invitationInput }) {
          invitation {
            contactByContactId {
              ...ContactItem
            }
            id
          }
        }
      }
    `),
  )
