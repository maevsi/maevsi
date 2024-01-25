import { consola } from 'consola'
import { type H3Event } from 'h3'

import { TURNSTILE_HEADER_KEY } from '~/utils/constants'

export default defineEventHandler(async function (event: H3Event) {
  const { req, res } = event.node
  const body = await readBody(event)

  switch (body.operationName) {
    case 'authenticate':
    case 'accountRegistration':
      {
        const turnstileToken = req.headers[TURNSTILE_HEADER_KEY.toLowerCase()]

        if (Array.isArray(turnstileToken)) {
          return throwError(422, 'Turnstile token cannot be an array.')
        }

        if (!turnstileToken) {
          return throwError(422, 'Turnstile token not provided.')
        }

        const result = await verifyTurnstileToken(turnstileToken)

        if (!result.success) {
          return throwError(
            403,
            `Turnstile verification unsuccessful: ${result['error-codes'].join(', ')}`,
          )
        }

        consola.debug('Turnstile verification succeeded')
        res.end()
      }

      break
    default:
      res.end()
  }
})

function throwError(code: number, message: string) {
  consola.error(message)
  throw createError({
    statusCode: code,
    statusMessage: message,
  })
}
