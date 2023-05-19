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
    return await ofetch<string>(
      `https://${config.public.stagingHost}/api/auth-key`
    )
  } else {
    return jwtPublicKeyPath && fs.existsSync(jwtPublicKeyPath)
      ? fs.readFileSync(jwtPublicKeyPath, 'utf-8')
      : undefined
  }
}
