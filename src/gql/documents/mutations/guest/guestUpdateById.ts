import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useUpdateGuestByIdMutation = () =>
  useMutation(
    graphql(`
      mutation updateGuestById($id: UUID!, $guestPatch: GuestPatch!) {
        updateGuestById(input: { id: $id, guestPatch: $guestPatch }) {
          guest {
            ...GuestItem
            contactByContactId {
              ...ContactItem
            }
          }
        }
      }
    `),
  )
