import { type FragmentType, graphql, useFragment } from '~~/gql/generated'

export const AddressItem = graphql(`
  fragment AddressItem on Address {
    id
    city
    country
    line1
    line2
    name
    postalCode
    region
  }
`)

export const getAddressItem = (
  fragment?: FragmentType<typeof AddressItem> | null,
) => useFragment(AddressItem, fragment)
