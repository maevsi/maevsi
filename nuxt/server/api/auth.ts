import fs from 'fs'
import { CompatibilityEvent } from 'h3'

import { serialize } from 'cookie'
import jsonwebtoken from 'jsonwebtoken'

const configPostgraphileJwtPublicKeyPath =
  process.env.POSTGRAPHILE_JWT_PUBLIC_KEY_FILE || ''
const configPostgraphileJwtPublicKey = fs.existsSync(
  configPostgraphileJwtPublicKeyPath
)
  ? fs.readFileSync(configPostgraphileJwtPublicKeyPath, 'utf-8')
  : undefined

export default function (event: CompatibilityEvent) {
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
      // eslint-disable-next-line import/no-named-as-default-member
      jsonwebtoken.verify(jwt, configPostgraphileJwtPublicKey, {
        algorithms: ['RS256'],
        audience: 'postgraphile',
        issuer: 'postgraphile',
      })
    } catch (err: any) {
      res.statusCode = 401
      res.end('Json web token verification failed: "' + err.message + '"!')
      return
    }
  }

  res.setHeader(
    'Set-Cookie',
    serialize('__Secure-apollo-token', jwt, {
      expires: jwt ? new Date(Date.now() + 86400 * 1000 * 31) : new Date(0),
      httpOnly: true,
      path: '/',
      sameSite: 'lax', // Cannot be 'strict' to allow authentications after clicking on links within webmailers.
      secure: true,
    })
  )
  res.end()
}
