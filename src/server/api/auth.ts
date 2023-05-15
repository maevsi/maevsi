import { H3Event, setCookie } from 'h3'
import { jwtVerify, importSPKI } from 'jose'

import { useJwtPublicKey } from './auth-key'
import { JWT_NAME, JWT_ALGORITHM } from '~/utils/constants'

export default defineEventHandler(async (event: H3Event) => {
  const { req, res } = event.node
  const jwtPublicKey = await useJwtPublicKey()
  let jwt = ''

  if (req.headers.authorization) {
    jwt = req.headers.authorization.substring(7)

    // TODO: decide whether to use the following if / to fetch the authentication key from staging (https://github.com/maevsi/maevsi/issues/916)
    if (process.env.NODE_ENV === 'production') {
      if (!jwtPublicKey) {
        return sendError(
          event,
          createError({
            statusCode: 500,
            statusMessage: 'Secret missing!',
          })
        )
      }

      try {
        await jwtVerify(jwt, await importSPKI(jwtPublicKey, JWT_ALGORITHM), {
          algorithms: [JWT_ALGORITHM],
          audience: 'postgraphile',
          issuer: 'postgraphile',
        })
      } catch (err: any) {
        return sendError(
          event,
          createError({
            statusCode: 401,
            statusMessage:
              'Json web token verification failed: "' + err.message + '"!',
          })
        )
      }
    }
  }

  setCookie(event, JWT_NAME(), jwt, {
    expires: jwt ? new Date(Date.now() + 86400 * 1000 * 31) : new Date(0),
    httpOnly: true,
    // path: '/',
    sameSite: 'lax', // Cannot be 'strict' to allow authentications after clicking on links within webmailers.
    secure: true,
  })
  res.end()
})
