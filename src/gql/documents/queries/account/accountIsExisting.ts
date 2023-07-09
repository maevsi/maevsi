import { useQuery } from '@urql/vue'
import { graphql } from '~/gql/generated'
import { AccountIsExistingQueryVariables } from '~/gql/generated/graphql'

export const useAccountIsExistingQuery = (
  variables: AccountIsExistingQueryVariables,
) =>
  useQuery({
    query: accountIsExistingQuery,
    variables,
  })

export const accountIsExistingQuery = graphql(`
  query accountIsExisting($username: String!) {
    accountIsExisting(username: $username)
  }
`)
