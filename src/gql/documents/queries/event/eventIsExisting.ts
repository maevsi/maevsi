import { useQuery } from '@urql/vue'
import { graphql } from '~/gql/generated'
import { EventIsExistingQueryVariables } from '~/gql/generated/graphql'

export const useEventIsExistingQuery = (
  variables: EventIsExistingQueryVariables
) =>
  useQuery({
    query: eventIsExistingQuery,
    variables,
  })

export const eventIsExistingQuery = graphql(`
  query eventIsExisting($authorUsername: String!, $slug: String!) {
    eventIsExisting(authorUsername: $authorUsername, slug: $slug)
  }
`)
