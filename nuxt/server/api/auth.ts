import fs from 'fs'

import { serialize } from 'cookie'
import { H3Event } from 'h3'
import { jwtVerify, importSPKI } from 'jose'

import { JWT_NAME, JWT_ALGORITHM } from '~/plugins/util/constants'

const configPostgraphileJwtPublicKeyPath =
  process.env.POSTGRAPHILE_JWT_PUBLIC_KEY_FILE || ''
const configPostgraphileJwtPublicKey = fs.existsSync(
  configPostgraphileJwtPublicKeyPath
)
  ? fs.readFileSync(configPostgraphileJwtPublicKeyPath, 'utf-8')
  : undefined

export default defineEventHandler(async function (event: H3Event) {
  const { req, res } = event

  if (configPostgraphileJwtPublicKey === undefined) {
    res.statusCode = 500
    res.end('Secret missing!')
    return
  }

  let jwt = ''

  if (req.headers.authorization !== undefined) {
    // There is an authorization header.
    jwt = req.headers.authorization.substring(7)

    try {
      jwtVerify(
        jwt,
        await importSPKI(configPostgraphileJwtPublicKey, JWT_ALGORITHM),
        {
          algorithms: [JWT_ALGORITHM],
          audience: 'postgraphile',
          issuer: 'postgraphile',
        }
      )
    } catch (err: any) {
      res.statusCode = 401
      res.end('Json web token verification failed: "' + err.message + '"!')
      return
    }
  }

  res.setHeader(
    'Set-Cookie',
    serialize(JWT_NAME, jwt, {
      expires: jwt ? new Date(Date.now() + 86400 * 1000 * 31) : new Date(0),
      httpOnly: true,
      path: '/',
      sameSite: 'lax', // Cannot be 'strict' to allow authentications after clicking on links within webmailers.
      secure: true,
    })
  )
  res.end()
})
