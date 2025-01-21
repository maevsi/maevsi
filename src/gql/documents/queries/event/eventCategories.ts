import { useQuery } from '@urql/vue'
import { graphql } from '~~/gql/generated'
import type { EventCategoriesQuery } from '~~/gql/generated/graphql'

export const eventCategoriesQuery = graphql(`
  query EventCategories {
    allEventCategories {
      edges {
        node {
          category
        }
      }
    }
  }
`)

export const useEventCategoriesQuery = () =>
  useQuery<EventCategoriesQuery>({
    query: eventCategoriesQuery,
  })
