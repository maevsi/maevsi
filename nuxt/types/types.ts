import { CombinedError } from '@urql/core'
import { GraphQLError } from 'graphql'

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

// if an `originalError` property seems to be required, consider https://github.com/maevsi/maevsi/pull/1182/files#diff-3011f5fc2745796b181fe633b2590cfeb2e976aec95b8e94630bba0cc6163c1cL8
export type BackendError = {
  graphQLErrors: (GraphQLError & { errcode?: string })[]
} & CombinedError

export type UnionToIntersection<T> = (
  T extends any ? (x: T) => any : never
) extends (x: infer R) => any
  ? R
  : never
