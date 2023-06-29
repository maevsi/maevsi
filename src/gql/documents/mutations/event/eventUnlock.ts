import { useMutation } from '@urql/vue'
import { graphql } from '~/gql/generated'

export const useEventUnlockMutation = () => useMutation(eventUnlockMutation)

export const eventUnlockMutation = graphql(`
  mutation eventUnlock($invitationCode: UUID!) {
    eventUnlock(input: { invitationCode: $invitationCode }) {
      eventUnlockResponse {
        eventSlug
        jwt
        authorUsername
      }
    }
  }
`)
