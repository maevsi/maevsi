import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useDeleteInvitationByIdMutation = () =>
  useMutation(
    graphql(`
      mutation deleteInvitationById($id: UUID!) {
        deleteInvitationById(input: { id: $id }) {
          clientMutationId
        }
      }
    `),
  )
