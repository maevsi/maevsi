import { type FragmentType, graphql, useFragment } from '~~/gql/generated'

export const EventItem = graphql(`
  fragment EventItem on Event {
    id
    nodeId
    authorAccountId
    accountByAuthorAccountId {
      id
      username
    }
    description
    end
    inviteeCountMaximum
    isArchived
    isInPerson
    isRemote
    location
    name
    slug
    start
    url
    visibility
  }
`)

export const getEventItem = (
  fragment?: FragmentType<typeof EventItem> | null,
) => useFragment(EventItem, fragment)
