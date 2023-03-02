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
        if (turnstileKey === undefined) {
          consola.error('TurnstileKey undefined')
          throw createError({
            statusCode: 422,
            statusMessage: 'TurnstileKey undefined',
          })
        }

        if (!turnstileKey) {
          consola.error('TurnstileKey not provided')
          throw createError({
            statusCode: 422,
            statusMessage: 'TurnstileKey not provided.',
          })
        }
        const result = await verifyTurnstileToken(turnstileKey)
        consola.debug(result)
        if (!result.success) {
          consola.error('Turnstile verification unsuccessful.')
          throw createError({
            statusCode: 403,
            statusMessage: 'Turnstile verification unsuccessful.',
          })
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
