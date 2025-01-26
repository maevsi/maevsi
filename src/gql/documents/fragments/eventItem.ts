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
    addressByAddressId {
      ...AddressItem
    }
    createdBy
    description
    end
    inviteeCountMaximum
    isArchived
    isInPerson
    isRemote
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
