import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useDeleteContactByIdMutation = () =>
  useMutation(
    graphql(`
      mutation deleteContactById($id: UUID!) {
        deleteContactById(input: { id: $id }) {
          clientMutationId
          contact {
            ...ContactItem
          }
        }
      }
    `),
  )
