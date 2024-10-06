import { consola } from 'consola'
import type { H3Event } from 'h3'
import { z } from 'zod'

import { TURNSTILE_HEADER_KEY } from '~/utils/constants'
import { getBodySafe } from '../utils/validation'

const authProxyBodySchema = z.object({
  operationName: z.string().optional(),
})

export default defineEventHandler(async function (event: H3Event) {
  const { req, res } = event.node

  if (req.method !== 'POST') {
    consola.debug("Skipping auth proxy as request wasn't POSTed.")
    return res.end()
  }

  const body = await getBodySafe({ event, schema: authProxyBodySchema })

  if (!body.operationName) {
    consola.debug("Request's body is missing the operation name.")
    return res.end()
  }

  switch (body.operationName) {
    case 'authenticate': // TODO: don't verify turnstile on anonymous authentication (https://github.com/maevsi/maevsi/issues/1567)
    case 'accountRegistration':
      await turnstileVerify(event)
      break
    default:
      return res.end()
  }

  res.end()
})

const turnstileVerify = async (event: H3Event) => {
  const { req } = event.node

  const turnstileToken = req.headers[TURNSTILE_HEADER_KEY.toLowerCase()]

  if (Array.isArray(turnstileToken)) {
    return throwError({
      code: 422,
      message: 'Turnstile token cannot be an array.',
    })
  }

  if (!turnstileToken) {
    return throwError({
      code: 422,
      message: 'Turnstile token not provided.',
    })
  }

  const result = await verifyTurnstileToken(turnstileToken)

  if (!result.success) {
    return throwError({
      code: 403,
      message: `Turnstile verification unsuccessful: ${result['error-codes'].join(', ')}`,
    })
  }

  consola.debug('Turnstile verification succeeded')
}
