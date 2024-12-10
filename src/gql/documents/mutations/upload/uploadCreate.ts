import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useUploadCreateMutation = () =>
  useMutation(
    graphql(`
      mutation uploadCreate($uploadCreateInput: UploadCreateInput!) {
        uploadCreate(input: $uploadCreateInput) {
          clientMutationId
          upload {
            id
          }
        }
      }
    `),
  )
