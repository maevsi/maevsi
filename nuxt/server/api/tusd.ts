import fs from 'fs'
import http, { ServerResponse } from 'http'
import { useBody, useQuery, useMethod, CompatibilityEvent } from 'h3'
import consola from 'consola'
import jsonwebtoken from 'jsonwebtoken'
import pg, { QueryResult } from 'pg'
import fetch from 'node-fetch'

const secretPostgresDbPath = '/run/secrets/postgres_db'
const secretPostgraphileJwtSecretPath = '/run/secrets/postgraphile_jwt-secret'
const secretPostgresRoleMaevsiTusdPasswordPath =
  '/run/secrets/postgres_role_maevsi-tusd_password'

const secretPostgraphileJwtSecret = fs.existsSync(
  secretPostgraphileJwtSecretPath
)
  ? fs.readFileSync(secretPostgraphileJwtSecretPath, 'utf-8')
  : undefined

// eslint-disable-next-line import/no-named-as-default-member
const pool = new pg.Pool({
  database: fs.existsSync(secretPostgresDbPath)
    ? fs.readFileSync(secretPostgresDbPath, 'utf-8')
    : undefined,
  host: 'postgres',
  password: fs.existsSync(secretPostgresRoleMaevsiTusdPasswordPath)
    ? fs.readFileSync(secretPostgresRoleMaevsiTusdPasswordPath, 'utf-8')
    : undefined,
  user: 'maevsi_tusd', // lgtm [js/hardcoded-credentials]
})

export default async function (event: CompatibilityEvent) {
  const method = useMethod(event)

  switch (method) {
    case 'DELETE':
      await tusdDelete(event)
      break
    case 'POST':
      await tusdPost(event)
      break
    default:
      consola.warn(`Unexpected request method: ` + method)
  }
}

async function deleteUpload(
  res: ServerResponse,
  uploadId: any,
  storageKey: any
) {
  await pool
    .query(
      'DELETE FROM maevsi.profile_picture WHERE upload_storage_key = $1;',
      [storageKey]
    )
    .then(async (_queryRes: QueryResult<any>) => {
      await pool
        .query('DELETE FROM maevsi.upload WHERE id = $1;', [uploadId])
        .then((_queryRes: QueryResult<any>) => {
          res.statusCode = 204
          res.end()
        })
        .catch((err) => {
          res.statusCode = 500
          res.end(err.message)
        })
    })
    .catch((err) => {
      res.statusCode = 500
      res.end(err.message)
    })
}

async function tusdDelete(event: CompatibilityEvent) {
  const { req, res } = event
  const uploadId = useQuery(event).uploadId

  consola.log('tusdDelete: ' + uploadId)

  if (req.headers.authorization === undefined) {
    res.statusCode = 401
    res.end('The request header "Authorization" is undefined!')
    return
  }

  if (secretPostgraphileJwtSecret === undefined) {
    res.statusCode = 500
    res.end('Secret missing!')
    return
  }

  try {
    // eslint-disable-next-line import/no-named-as-default-member
    jsonwebtoken.verify(
      req.headers.authorization.substring(7),
      secretPostgraphileJwtSecret,
      {
        audience: 'postgraphile',
        issuer: 'postgraphile',
      }
    )
  } catch (err: any) {
    res.statusCode = 401
    res.end('Json web token verification failed: "' + err.message + '"!')
    return
  }

  await pool
    .query('SELECT * FROM maevsi.upload WHERE id = $1;', [uploadId])
    .then(async (queryRes: QueryResult<any>) => {
      if (queryRes.rows.length === 0) {
        res.statusCode = 500
        res.end('No result found for id "' + uploadId + '"!')
        return
      }

      const storageKey = queryRes.rows[0] ? queryRes.rows[0].storage_key : null

      if (storageKey !== null) {
        const httpResp = await fetch(
          'http://tusd:1080/files/' + storageKey + '+',
          {
            headers: {
              'Tus-Resumable': '1.0.0',
            },
            method: 'DELETE',
          }
        )

        if (httpResp.ok) {
          if (httpResp.status === 204) {
            await deleteUpload(res, uploadId, storageKey)
            res.statusCode = 204
            res.end()
          } else if (httpResp.status === 404) {
            await deleteUpload(res, uploadId, storageKey)
          } else {
            res.statusCode = 500
            res.end('Tusd status was "' + httpResp.status + '".')
          }
        } else {
          res.statusCode = 500
          res.end('Internal delete failed: "' + httpResp.statusText + '"!')
        }
      } else {
        await deleteUpload(res, uploadId, storageKey)
      }
    })
    .catch((err) => {
      res.statusCode = 500
      res.end(err.message)
    })
}

async function tusdPost(event: CompatibilityEvent) {
  const { req, res } = event
  const body = await useBody(event)

  switch (req.headers['hook-name']) {
    case 'pre-create':
      consola.log('tusd/pre-create')

      await pool
        .query('SELECT EXISTS(SELECT * FROM maevsi.upload WHERE uuid = $1);', [
          body.Upload.MetaData.maevsiUploadUuid,
        ])
        .then((queryRes: QueryResult<any>) => {
          if (!queryRes.rows[0].exists) {
            consola.error('Upload id does not exist!')
            res.statusCode = 500
            res.end()
            return
          }

          res.end()
        })
        .catch((err) => {
          consola.error(err)
          res.statusCode = 500
          res.end()
        })

      break
    case 'post-finish':
      consola.log('tusd/post-finish: ' + body.Upload.Storage.Key)

      await pool
        .query('UPDATE maevsi.upload SET storage_key = $1 WHERE uuid = $2;', [
          body.Upload.Storage.Key,
          body.Upload.MetaData.maevsiUploadUuid,
        ])
        .then((_queryRes: QueryResult<any>) => {
          res.end()
        })
        .catch((err) => {
          res.statusCode = 500
          res.end(err.message)
        })

      break
    case 'post-terminate':
      consola.log('tusd/post-terminate: ' + body.Upload.Storage.Key)
      await deleteUpload(
        res,
        body.Upload.MetaData.maevsiUploadUuid,
        body.Upload.Storage.Key
      )

      break
  }
}
