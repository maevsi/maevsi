export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type UnionToIntersection<T> = (
  T extends unknown ? (x: T) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never

export type LastOf<T> =
  UnionToIntersection<T extends unknown ? () => T : never> extends () => infer R
    ? R
    : never

export type MaybeRef<T> = T | (() => T) | Ref<T>
export type MaybeRefObj<T> = T extends object
  ? {
      [K in keyof T]: MaybeRef<T[K]>
    }
  : T

type Push<T extends unknown[], V> = [...T, V]

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
