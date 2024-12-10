import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useProfilePictureSetMutation = () =>
  useMutation(
    graphql(`
      mutation profilePictureSet($uploadId: UUID!) {
        profilePictureSet(input: { uploadId: $uploadId }) {
          clientMutationId
        }
      }
    `),
  )
