import { consola } from 'consola'
import type { H3Event } from 'h3'
import { z } from 'zod'

const authProxyBodySchema = z.object({
  operationName: z.string().optional(),
  variables: z
    .object({
      password: z.string().optional(),
      username: z.string().optional(),
    })
    .optional()
    .nullable(),
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
    case 'authenticate':
      // don't check captcha for anonymous authentication
      if (body.variables?.password === '' && body.variables.username === '')
        return res.end()

      await turnstileVerify(event)
      break
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
