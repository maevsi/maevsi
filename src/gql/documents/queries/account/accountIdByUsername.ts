import { useQuery } from '@urql/vue'
import { graphql } from '~/gql/generated'
import { AccountIdByUsernameQueryVariables } from '~/gql/generated/graphql'

export const useAccountIdByUsernameQuery = (
  variables: AccountIdByUsernameQueryVariables
) =>
  useQuery({
    query: accountIdByUsernameQuery,
    variables,
  })

export const accountIdByUsernameQuery = graphql(`
  query accountIdByUsername($username: String!) {
    accountIdByUsername(username: $username)
  }
`)
