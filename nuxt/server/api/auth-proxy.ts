import { H3Event } from 'h3'
import consola from 'consola'
import { TURNSTILE_HEADER_KEY } from '~/utils/constants'

export default defineEventHandler(async function (event: H3Event) {
  consola.trace('Inside auth-proxy.ts')
  const { req, res } = event.node
  const turnstileKey = req.headers[TURNSTILE_HEADER_KEY.toLowerCase()]
  consola.trace('Turnstile Key: ' + turnstileKey)
  if (turnstileKey === undefined) {
    res.end()
    return
  }

  if (!turnstileKey) {
    throw createError({
      statusCode: 422,
      statusMessage: 'TurnstileKey not provided.',
    })
  }
  const result = await verifyTurnstileToken(turnstileKey)
  consola.trace(result)
  if (!result.success) {
    consola.error('Turnstile verification unsuccessful!')
    createError({
      statusCode: 403,
      statusMessage: result['error-codes'].join(', '),
    })
    res.statusCode = 403
    res.statusMessage = 'Verification failed'
    res.end()
    return
  }
  consola.trace('Turnstile verification succeeded')
  res.end()
})
