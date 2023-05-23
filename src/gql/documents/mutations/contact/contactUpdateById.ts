import { useMutation } from '@urql/vue'
import { graphql } from '~/gql/generated'

export const useUpdateContactByIdMutation = () =>
  useMutation(
    graphql(`
      mutation updateContactById($id: BigInt!, $contactPatch: ContactPatch!) {
        updateContactById(input: { id: $id, contactPatch: $contactPatch }) {
          contact {
            ...ContactItem
          }
        }
      }
    `)
  )
