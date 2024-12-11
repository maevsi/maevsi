import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useUpdateInvitationByIdMutation = () =>
  useMutation(
    graphql(`
      mutation updateInvitationById(
        $id: UUID!
        $invitationPatch: InvitationPatch!
      ) {
        updateInvitationById(
          input: { id: $id, invitationPatch: $invitationPatch }
        ) {
          invitation {
            ...InvitationItem
            contactByContactId {
              ...ContactItem
            }
          }
        }
      }
    `),
  )
