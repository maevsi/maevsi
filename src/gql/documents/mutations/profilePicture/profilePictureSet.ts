import { useMutation } from '@urql/vue'
import { graphql } from '~/gql/generated'

export const useProfilePictureSetMutation = () =>
  useMutation(
    graphql(`
      mutation profilePictureSet($storageKey: String!) {
        profilePictureSet(input: { storageKey: $storageKey }) {
          clientMutationId
        }
      }
    `)
  )
