import { useQuery } from '@urql/vue'
import { graphql } from '~~/gql/generated'
import type { EventByAuthorAccountIdAndSlugQueryVariables } from '~~/gql/generated/graphql'

export const useEventByAuthorAccountIdAndSlugQuery = (
  variables: EventByAuthorAccountIdAndSlugQueryVariables,
) =>
  useQuery({
    query: eventByAuthorAccountIdAndSlugQuery,
    variables,
  })

export const eventByAuthorAccountIdAndSlugQuery = graphql(`
  query eventByAuthorAccountIdAndSlug(
    $authorAccountId: UUID!
    $slug: String!
    $invitationId: UUID
  ) {
    eventByAuthorAccountIdAndSlug(
      authorAccountId: $authorAccountId
      slug: $slug
    ) {
      ...EventItem
      invitationsByEventId(condition: { id: $invitationId }) {
        nodes {
          ...InvitationItem
          contactByContactId {
            ...ContactItem
          }
        }
      }
    }
  }
`)
