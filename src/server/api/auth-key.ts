import type { H3Event } from 'h3'

import { useJwtPublicKey } from '../utils/auth'

export default defineEventHandler(async (event: H3Event) => {
  const { res } = event.node
  const jwtPublicKey = await useJwtPublicKey()

  if (!jwtPublicKey) {
    return throwError({
      code: 500,
      message: 'The authentication key is not available!',
    })
  }

  res.setHeader('Content-Type', 'text/plain')
  res.end(jwtPublicKey)
})
