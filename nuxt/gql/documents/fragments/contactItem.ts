import { FragmentType, graphql, useFragment } from '~/gql/generated'

export const ContactItem = graphql(`
  fragment ContactItem on Contact {
    nodeId
    id
    accountUsername
    address
    authorAccountUsername
    emailAddress
    emailAddressHash
    firstName
    lastName
    phoneNumber
    url
  }
`)

export const getContactItem = (
  fragment?: FragmentType<typeof ContactItem> | null
) => useFragment(ContactItem, fragment)
