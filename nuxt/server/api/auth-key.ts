import fs from 'node:fs'

import { H3Event } from 'h3'
import { ofetch } from 'ofetch'

export default defineEventHandler(async (event: H3Event) => {
  const { res } = event.node
  const jwtPublicKey = await useJwtPublicKey()

  if (!jwtPublicKey) {
    sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'The authentication key is not available!',
      })
    )
  }

  res.setHeader('Content-Type', 'text/plain')
  res.end(jwtPublicKey)
})

export const useJwtPublicKey = async () => {
  const config = useRuntimeConfig()
  const jwtPublicKeyPath = process.env.POSTGRAPHILE_JWT_PUBLIC_KEY_FILE

  if (config.public.stagingHost) {
    const httpResp = await ofetch.raw(
      `https://${config.public.stagingHost}/api/auth-key`
    )

    if (!httpResp.ok) return undefined

    return httpResp._data
  } else {
    if (!jwtPublicKeyPath || !fs.existsSync(jwtPublicKeyPath)) return undefined

    return fs.readFileSync(jwtPublicKeyPath, 'utf-8')
  }
}
