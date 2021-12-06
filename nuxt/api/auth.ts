import fs from 'fs'
import { ServerResponse } from 'http'

import { serialize } from 'cookie'
import jsonwebtoken from 'jsonwebtoken'

import { IncomingMessageWithBody } from '~/types/http'

const secretPostgraphileJwtSecretPath = '/run/secrets/postgraphile_jwt-secret'
const secretPostgraphileJwtSecret = fs.existsSync(
  secretPostgraphileJwtSecretPath
)
  ? fs.readFileSync(secretPostgraphileJwtSecretPath, 'utf-8')
  : undefined

export default function (req: IncomingMessageWithBody, res: ServerResponse) {
  if (secretPostgraphileJwtSecret === undefined) {
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
      jsonwebtoken.verify(jwt, secretPostgraphileJwtSecret, {
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
