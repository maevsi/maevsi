import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useEventUnlockMutation = () => useMutation(eventUnlockMutation)

export const eventUnlockMutation = graphql(`
  mutation eventUnlock($guestId: UUID!) {
    eventUnlock(input: { guestId: $guestId }) {
      eventUnlockResponse {
        creatorUsername
        eventSlug
        jwt
      }
    }
  }
`)
