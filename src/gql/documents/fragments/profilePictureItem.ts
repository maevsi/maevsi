import { FragmentType, graphql, useFragment } from '~/gql/generated'

export const ProfilePictureItem = graphql(`
  fragment ProfilePictureItem on ProfilePicture {
    id
    nodeId
    accountId
    uploadId
  }
`)

export const getProfilePictureItem = (
  fragment?: FragmentType<typeof ProfilePictureItem> | null
) => useFragment(ProfilePictureItem, fragment)
