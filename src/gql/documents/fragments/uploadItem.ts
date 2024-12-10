import { type FragmentType, graphql, useFragment } from '~~/gql/generated'

export const UploadItem = graphql(`
  fragment UploadItem on Upload {
    id
    nodeId
    accountId
    sizeByte
    storageKey
  }
`)

export const getUploadItem = (
  fragment?: FragmentType<typeof UploadItem> | null,
) => useFragment(UploadItem, fragment)
