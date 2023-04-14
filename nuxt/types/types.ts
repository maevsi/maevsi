import { CombinedError } from '@urql/core'
import { GraphQLError } from 'graphql'

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

// if an `originalError` property shows up, see the PR's changes for https://github.com/maevsi/maevsi/issues/993
export type BackendError = {
  graphQLErrors: (GraphQLError & { errcode?: string })[]
} & CombinedError

export type UnionToIntersection<T> = (
  T extends any ? (x: T) => any : never
) extends (x: infer R) => any
  ? R
  : never
