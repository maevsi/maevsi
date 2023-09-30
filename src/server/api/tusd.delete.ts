import fs from 'node:fs'

import { createError, getQuery, H3Event, send, sendError } from 'h3'
import { consola } from 'consola'
import { jwtVerify, importSPKI } from 'jose'
import { ofetch } from 'ofetch'

import { JWT_ALGORITHM } from '~/utils/constants'

const configPostgraphileJwtPublicKeyPath =
  process.env.POSTGRAPHILE_JWT_PUBLIC_KEY_FILE || ''
const configPostgraphileJwtPublicKey = fs.existsSync(
  configPostgraphileJwtPublicKeyPath,
)
  ? fs.readFileSync(configPostgraphileJwtPublicKeyPath, 'utf-8')
  : undefined

export default defineEventHandler(async (event: H3Event) => {
  const {
    node: { req },
  } = event
  const uploadId = getQuery(event).uploadId

  consola.log('tusdDelete: ' + uploadId)

  if (req.headers.authorization === undefined) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'The request header "Authorization" is undefined!',
      }),
    )
  }

  if (configPostgraphileJwtPublicKey === undefined) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Secret missing!',
      }),
    )
  }

  try {
    jwtVerify(
      req.headers.authorization.substring(7),
      await importSPKI(configPostgraphileJwtPublicKey, JWT_ALGORITHM),
      {
        algorithms: [JWT_ALGORITHM],
        audience: 'postgraphile',
        issuer: 'postgraphile',
      },
    )
  } catch (err: any) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: `Json web token verification failed: "${err.message}"!`,
      }),
    )
  }

  const queryRes = await pool
    .query('SELECT * FROM maevsi.upload WHERE id = $1;', [uploadId])
    .catch((err) => {
      sendError(
        event,
        createError({ statusCode: 500, statusMessage: err.message }),
      )
    })

  if (!queryRes) return

  if (queryRes.rows.length === 0) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'No result found for id "' + uploadId + '"!',
      }),
    )
  }

  const storageKey = (
    queryRes.rows[0] ? queryRes.rows[0].storage_key : undefined
  ) as string | undefined

  consola.log('storageKey:' + storageKey)

  if (storageKey) {
    const httpResp = await ofetch.raw('http://tusd:8080/files/' + storageKey, {
      headers: {
        'Tus-Resumable': '1.0.0',
      },
      // ignoreResponseError: true,
      method: 'DELETE',
    })

    if (httpResp.status === 204) {
      await deleteUpload(event, uploadId)
      event.node.res.statusCode = 204
      await send(event)
    } else if (httpResp.status === 404) {
      await deleteUpload(event, uploadId)
    } else {
      return sendError(
        event,
        createError({
          statusCode: 500,
          statusMessage: 'Tusd status was "' + httpResp.status + '".',
        }),
      )
    }
  } else {
    await deleteUpload(event, uploadId)
  }
})
