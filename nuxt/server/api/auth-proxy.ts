import { H3Event, readBody } from 'h3'
import consola from 'consola'
import { TURNSTILE_HEADER_KEY } from '~/utils/constants'

export default defineEventHandler(async function (event: H3Event) {
  const { req, res } = event.node
  consola.debug(getMethod(event))
  consola.debug('Request: ' + req)
  let body: any
  try {
    body = await readBody(event)
  } catch (e) {
    consola.error(e)
  }

  switch (body.operationName) {
    case 'authenticate':
    case 'accountRegistration':
      {
        const turnstileKey = req.headers[TURNSTILE_HEADER_KEY.toLowerCase()]
        if (Array.isArray(turnstileKey)) {
          throwError(422, 'TurnstileKey cannot be an array.')
        }
        if (!turnstileKey) {
          throwError(422, 'TurnstileKey not provided.')
        }
        const result = await verifyTurnstileToken(turnstileKey)
        if (!result.success) {
          throwError(403, 'Turnstile verification unsuccessful.')
        }
        consola.debug('Turnstile verification succeeded')
        res.end()
      }
      break

    default:
      consola.debug('No authentication needed.')
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
