import { useQuery } from '@urql/vue'
import { graphql } from '~~/gql/generated'
import type { AllLegalTermsQueryVariables } from '~~/gql/generated/graphql'

export const useAllLegalTermsQuery = (variables: AllLegalTermsQueryVariables) =>
  useQuery({
    query: allLegalTermsQuery,
    variables,
  })

export const allLegalTermsQuery = graphql(`
  query allLegalTerms {
    allLegalTerms {
      nodes {
        id
        term
      }
    }
  }
`)
