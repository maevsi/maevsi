import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useJwtRefreshMutation = () => useMutation(jwtRefreshMutation)

export const jwtRefreshMutation = graphql(`
  mutation jwtRefresh($id: UUID!) {
    jwtRefresh(input: { jwtId: $id }) {
      clientMutationId
      jwt
    }
  }
`)
