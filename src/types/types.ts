export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type UnionToIntersection<T> = (
  T extends any ? (x: T) => any : never
) extends (x: infer R) => any
  ? R
  : never

export type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => infer R
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
