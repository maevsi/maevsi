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

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    console.debug("Skipping auth proxy as request wasn't POSTed.")
    return
  }

  const body = await getBodySafe({ event, schema: authProxyBodySchema })

  if (!body.operationName) {
    console.debug("Request's body is missing the operation name.")
    return
  }

  switch (body.operationName) {
    case 'authenticate':
      // don't check captcha for anonymous authentication
      if (body.variables?.password === '' && body.variables.username === '')
        return

      await turnstileVerify(event)
      break
    case 'accountRegistration':
      await turnstileVerify(event)
      break
    default:
      return
  }
})

const turnstileVerify = async (event: H3Event) => {
  const turnstileToken = getRequestHeader(
    event,
    TURNSTILE_HEADER_KEY.toLowerCase(),
  )

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

  console.debug('Turnstile verification succeeded')
}
