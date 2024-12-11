import { useQuery } from '@urql/vue'
import { graphql } from '~~/gql/generated'
import type { EventIsExistingQueryVariables } from '~~/gql/generated/graphql'

export const useEventIsExistingQuery = (
  variables: EventIsExistingQueryVariables,
) =>
  useQuery({
    query: eventIsExistingQuery,
    variables,
  })

export const eventIsExistingQuery = graphql(`
  query eventIsExisting($authorAccountId: UUID!, $slug: String!) {
    eventIsExisting(authorAccountId: $authorAccountId, slug: $slug)
  }
`)
