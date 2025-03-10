import { graphql } from '~~/gql/generated'
import { useMutation } from '@urql/vue'

export const useCreateLegalTermAcceptanceMutation = () =>
  useMutation(
    graphql(`
      mutation CreateLegalTermAcceptance(
        $input: CreateLegalTermAcceptanceInput!
      ) {
        createLegalTermAcceptance(input: $input) {
          legalTermAcceptance {
            id
            accountId
            createdAt
            legalTermId
          }
        }
      }
    `),
  )
