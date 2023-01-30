import { CombinedError } from '@urql/core'
import { GraphQLError } from 'graphql'

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type BackendError = {
  graphQLErrors: (GraphQLError & { originalError?: { errcode?: string } })[]
} & CombinedError

export type UnionToIntersection<T> = (
  T extends any ? (x: T) => any : never
) extends (x: infer R) => any
  ? R
  : never
