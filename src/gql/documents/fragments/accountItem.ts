import { type FragmentType, graphql, useFragment } from '~~/gql/generated'

export const AccountItem = graphql(`
  fragment AccountItem on Account {
    nodeId
    id
    username
  }
`)

export const getAccountItem = (
  fragment?: FragmentType<typeof AccountItem> | null,
) => useFragment(AccountItem, fragment)
