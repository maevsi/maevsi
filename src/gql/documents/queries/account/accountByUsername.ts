import { useQuery } from '@urql/vue'
import { graphql } from '~~/gql/generated'
import type { AccountByUsernameQueryVariables } from '~~/gql/generated/graphql'

export const useAccountByUsernameQuery = (
  variables: AccountByUsernameQueryVariables,
) =>
  useQuery({
    query: accountByUsernameQuery,
    variables,
  })

export const accountByUsernameQuery = graphql(`
  query accountByUsername($username: String!) {
    accountByUsername(username: $username) {
      ...AccountItem
    }
  }
`)
