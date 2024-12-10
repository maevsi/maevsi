import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useEventDeleteMutation = () =>
  useMutation(
    graphql(`
      mutation eventDelete($id: UUID!, $password: String!) {
        eventDelete(input: { id: $id, password: $password }) {
          clientMutationId
          event {
            ...EventItem
          }
        }
      }
    `),
  )
