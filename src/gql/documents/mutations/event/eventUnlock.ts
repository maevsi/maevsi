import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useEventUnlockMutation = () => useMutation(eventUnlockMutation)

export const eventUnlockMutation = graphql(`
  mutation eventUnlock($invitationId: UUID!) {
    eventUnlock(input: { invitationId: $invitationId }) {
      eventUnlockResponse {
        authorAccountUsername
        eventSlug
        jwt
      }
    }
  }
`)
