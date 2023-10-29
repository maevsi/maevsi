import { CombinedError } from '@urql/core'
import { GraphQLError } from 'graphql'
import type { BreadcrumbItemProps } from 'nuxt-seo-ui'

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

export type LastOf<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never

type Push<T extends any[], V> = [...T, V]

export type UnionToTuple<
  T,
  L = LastOf<T>,
  N = [T] extends [never] ? true : false,
> = true extends N ? [] : Push<UnionToTuple<Exclude<T, L>>, L>

export type UnionToTupleRecord<K extends string, U, E> = {
  [Index in keyof UnionToTuple<U>]: Index extends keyof unknown[]
    ? Index extends number
      ? { [Key in K]: UnionToTuple<U>[Index] } & E
      : unknown[][Index]
    : { [Key in K]: UnionToTuple<U>[Index] } & E
}

type BreadcrumbItemPropsLocalizedObject = Omit<
  BreadcrumbItemProps,
  'ariaLabel' | 'label' | 'to'
> & {
  ariaLabel?: { [Key in LOCALE_CODES]: string } | string
  label?: { [Key in LOCALE_CODES]: string } | string
  to: string
}

export type BreadcrumbItemPropsLocalized =
  | BreadcrumbItemPropsLocalizedObject
  | (() => BreadcrumbItemPropsLocalizedObject)
