import { useQuery } from '@urql/vue'
import { graphql } from '~/gql/generated'
import type { AccountUploadQuotaBytesQueryVariables } from '~/gql/generated/graphql'

export const useAccountUploadQuotaBytesQuery = (
  variables: AccountUploadQuotaBytesQueryVariables,
) =>
  useQuery({
    query: graphql(`
      query accountUploadQuotaBytes {
        accountUploadQuotaBytes
      }
    `),
    variables,
  })
