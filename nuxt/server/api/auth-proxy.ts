import { H3Event, readBody } from 'h3'
import consola from 'consola'
import { TURNSTILE_HEADER_KEY } from '~/utils/constants'

export default defineEventHandler(async function (event: H3Event) {

  const { req, res } = event.node
  consola.debug(getMethod(event))
  consola.debug('Request: ' + req)
  consola.debug('Before ReadBody')
  consola.debug('Headers:\n' + JSON.stringify(req.headers, null, 2))
  try {
    const body = await readBody(event)
    consola.debug(body)
  } catch (e) {
    consola.error(e)
  }

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
