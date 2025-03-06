import { type FragmentType, graphql, useFragment } from '~~/gql/generated'

export const GuestItem = graphql(`
  fragment GuestItem on Guest {
    id
    nodeId
    contactId
    eventId
    feedback
    feedbackPaper
    contactByContactId {
      ...ContactItem
    }
  }
`)

export const getGuestItem = (
  fragment?: FragmentType<typeof GuestItem> | null,
) => useFragment(GuestItem, fragment)
