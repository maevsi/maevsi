import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useUpdateEventByIdMutation = () =>
  useMutation(
    graphql(`
      mutation updateEventById($id: UUID!, $eventPatch: EventPatch!) {
        updateEventById(input: { id: $id, eventPatch: $eventPatch }) {
          event {
            ...EventItem
          }
        }
      }
    `),
  )
