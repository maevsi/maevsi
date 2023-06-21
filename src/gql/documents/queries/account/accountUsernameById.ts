import { useQuery } from '@urql/vue'
import { graphql } from '~/gql/generated'
import { AccountUsernameByIdQueryVariables } from '~/gql/generated/graphql'

export const useAccountUsernameByIdQuery = (
  variables: AccountUsernameByIdQueryVariables
) =>
  useQuery({
    query: accountUsernameByIdQuery,
    variables,
  })

export const accountUsernameByIdQuery = graphql(`
  query accountUsernameById($id: UUID!) {
    accountUsernameById(id: $id)
  }
`)
