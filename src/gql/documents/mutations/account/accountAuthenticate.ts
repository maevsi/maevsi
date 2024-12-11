import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useAuthenticateMutation = () => useMutation(authenticateMutation)

export const authenticateMutation = graphql(`
  mutation authenticate($password: String!, $username: String!) {
    authenticate(input: { password: $password, username: $username }) {
      clientMutationId
      jwt
    }
  }
`)
