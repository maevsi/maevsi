import { ServerResponse } from 'http'
import cookie from 'cookie'
import { verify } from 'jsonwebtoken'

import { IncomingMessageWithBody } from '../types/http'

const fs = require('fs')

const secretPostgraphileJwtSecretPath = '/run/secrets/postgraphile_jwt-secret'
const secretPostgraphileJwtSecret = fs.existsSync(
  secretPostgraphileJwtSecretPath
)
  ? fs.readFileSync(secretPostgraphileJwtSecretPath, 'utf-8')
  : undefined

export default function (
  req: IncomingMessageWithBody,
  res: ServerResponse,
  _next: any
) {
  if (secretPostgraphileJwtSecret === undefined) {
    res.statusCode = 500
    res.end('Secret missing!')
    return
  }

  let jwt = ''

  if (req.headers.authorization !== undefined) {
    jwt = req.headers.authorization.substring(7)

    try {
      verify(jwt, secretPostgraphileJwtSecret, {
        audience: 'postgraphile',
        issuer: 'postgraphile',
      })
    } catch (err) {
      res.statusCode = 401
      res.end('Json web token verification failed: "' + err.message + '"!')
      return
    }
  }

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('apollo-token', jwt, {
      expires: jwt ? new Date(Date.now() + 86400 * 1000 * 7) : new Date(0),
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: true,
    })
  )
  res.end()
}
