import { consola } from 'consola'

export const throwError = <DataT = unknown>({
  code,
  data,
  message,
}: {
  code: number
  data?: DataT
  message: string
}) => {
  consola.error(message)
  throw createError({
    data,
    statusCode: code,
    statusMessage: message,
  })
}
