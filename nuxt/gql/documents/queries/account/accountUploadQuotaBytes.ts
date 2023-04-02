import { useQuery } from '@urql/vue'
import { graphql } from '~/gql/generated'

export const useAccountUploadQuotaBytesQuery = () =>
  useQuery({
    query: graphql(`
      query accountUploadQuotaBytes {
        accountUploadQuotaBytes
      }
    `),
  })
