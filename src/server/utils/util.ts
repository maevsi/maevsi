import { consola } from 'consola'

export { getSharedSentryConfig } from '~/composables/sentry'

export function throwError({
  code,
  message,
}: {
  code: number
  message: string
}) {
  consola.error(message)
  throw createError({
    statusCode: code,
    statusMessage: message,
  })
}
