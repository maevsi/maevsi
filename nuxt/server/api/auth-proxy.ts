import { H3Event, NodeIncomingMessage } from 'h3'
import consola from 'consola'

const SECRET_KEY = '1x0000000000000000000000000000000AA'

export default defineEventHandler(async function (event: H3Event) {
  const { req, res } = event.node
  const postResponse = handlePost(req)
  consola.trace(req)
})

async function handlePost(request: NodeIncomingMessage) {
  const body = await request.formData()
  // Turnstile injects a token in "cf-turnstile-response".
  const token = body.get('cf-turnstile-response')
  const ip = request.headers.get('CF-Connecting-IP')

  // Validate the token by calling the
  // "/siteverify" API endpoint.
  let formData = new FormData()
  formData.append('secret', SECRET_KEY)
  formData.append('response', token)
  formData.append('remoteip', ip)

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
  const result = await fetch(url, {
    body: formData,
    method: 'POST',
  })

  const outcome = await result.json()
  if (outcome.success) {
    // ...
  }
}
