import { useQuery } from '@urql/vue'
import { graphql } from '~~/gql/generated'
import type { AccountByIdQueryVariables } from '~~/gql/generated/graphql'

export const useAccountByIdQuery = (variables: AccountByIdQueryVariables) =>
  useQuery({
    query: accountByIdQuery,
    variables,
  })

export const accountByIdQuery = graphql(`
  query accountById($id: UUID!) {
    accountById(id: $id) {
      ...AccountItem
    }
  }
`)
