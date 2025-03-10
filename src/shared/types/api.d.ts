import type { CombinedError } from '@urql/core'
import type { GraphQLError } from 'graphql'

// if an `originalError` property seems to be required, consider https://github.com/maevsi/vibetype/pull/1182/files#diff-3011f5fc2745796b181fe633b2590cfeb2e976aec95b8e94630bba0cc6163c1cL8
export type BackendError = {
  graphQLErrors: (GraphQLError & { errcode?: string })[]
} & CombinedError
