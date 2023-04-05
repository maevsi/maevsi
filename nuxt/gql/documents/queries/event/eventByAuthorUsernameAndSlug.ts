import { useQuery } from '@urql/vue'
import { graphql } from '~/gql/generated'
import { EventByAuthorUsernameAndSlugQueryVariables } from '~/gql/generated/graphql'

export const useEventByAuthorUsernameAndSlugQuery = (
  variables: EventByAuthorUsernameAndSlugQueryVariables
) =>
  useQuery({
    query: graphql(`
      query eventByAuthorUsernameAndSlug(
        $authorUsername: String!
        $slug: String!
        $invitationUuid: UUID
      ) {
        eventByAuthorUsernameAndSlug(
          authorUsername: $authorUsername
          slug: $slug
        ) {
          ...EventItem
          invitationsByEventId(condition: { uuid: $invitationUuid }) {
            nodes {
              ...InvitationItem
              contactByContactId {
                ...ContactItem
              }
            }
          }
        }
      }
    `),
    variables,
  })
