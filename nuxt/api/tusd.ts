/* eslint-disable no-console */
import fs from 'fs'
import http, { IncomingMessage, ServerResponse } from 'http'

import consola from 'consola'
import { useBody } from 'h3'
import jsonwebtoken from 'jsonwebtoken'
import pg, { QueryResult } from 'pg'

import { IncomingMessageWithBody } from '~/types/http'

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

export default function (req: IncomingMessageWithBody, res: ServerResponse) {
  switch (req.method) {
    case 'DELETE':
      tusdDelete(req, res)
      break
    case 'POST':
      tusdPost(req, res)
      break
    default:
      consola.warn(`Unexpected request method: ` + req.method)
  }
}

function deleteUpload(res: ServerResponse, uploadId: any, storageKey: any) {
  pool.query(
    'DELETE FROM maevsi.profile_picture WHERE upload_storage_key = $1;',
    [storageKey],
    (err: Error, _queryRes: QueryResult<any>) => {
      if (err) {
        res.statusCode = 500
        res.end(err.message)
        return
      }

      pool.query(
        'DELETE FROM maevsi.upload WHERE id = $1;',
        [uploadId],
        (err: Error, _queryRes: QueryResult<any>) => {
          if (err) {
            res.statusCode = 500
            res.end(err.message)
            return
          }

          res.statusCode = 204
          res.end()
        }
      )
    }
  )
}

function tusdDelete(req: IncomingMessage, res: ServerResponse) {
  // eslint-disable-next-line compat/compat
  const uploadId = new URLSearchParams(req.url?.substring(1)).get('uploadId')

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

  pool.query(
    'SELECT * FROM maevsi.upload WHERE id = $1;',
    [uploadId],
    (err: Error, queryRes: QueryResult<any>) => {
      if (err) {
        res.statusCode = 500
        res.end(err.message)
        return
      }

      if (queryRes.rows.length === 0) {
        res.statusCode = 500
        res.end('No result found for id "' + uploadId + '"!')
        return
      }

      const storageKey = queryRes.rows[0] ? queryRes.rows[0].storage_key : null

      if (storageKey !== null) {
        const reqTusd = http
          .request(
            'http://tusd:1080/files/' + storageKey + '+',
            {
              headers: {
                'Tus-Resumable': '1.0.0',
              },
              method: 'DELETE',
            },
            (httpResp: any) => {
              httpResp.on('data', () => {}) // Do not remove! If you do, the 'end' event won't fire.
              httpResp.on('end', () => {
                if (httpResp.statusCode === 204) {
                  deleteUpload(res, uploadId, storageKey)
                  res.statusCode = 204
                  res.end()
                } else if (httpResp.statusCode === 404) {
                  deleteUpload(res, uploadId, storageKey)
                } else {
                  res.statusCode = 500
                  res.end('Tusd status was "' + httpResp.statusCode + '".')
                }
              })
            }
          )
          .on('error', (err: any) => {
            res.statusCode = 500
            res.end('Internal delete failed: "' + err.message + '"!')
          })

        reqTusd.end()
      } else {
        deleteUpload(res, uploadId, storageKey)
      }
    }
  )
}

async function tusdPost(req: IncomingMessageWithBody, res: ServerResponse) {
  const body = await useBody(req)

  switch (req.headers['hook-name']) {
    case 'pre-create':
      consola.log('tusd/pre-create')

      pool.query(
        'SELECT EXISTS(SELECT * FROM maevsi.upload WHERE uuid = $1);',
        [body.Upload.MetaData.maevsiUploadUuid],
        (err: Error, queryRes: QueryResult<any>) => {
          if (err) {
            consola.error(err)
            res.statusCode = 500
            res.end()
            return
          }

          if (!queryRes.rows[0].exists) {
            consola.error('Upload id does not exist!')
            res.statusCode = 500
            res.end()
            return
          }

          res.end()
        }
      )

      break
    case 'post-finish':
      consola.log('tusd/post-finish: ' + body.Upload.Storage.Key)

      pool.query(
        'UPDATE maevsi.upload SET storage_key = $1 WHERE uuid = $2;',
        [body.Upload.Storage.Key, body.Upload.MetaData.maevsiUploadUuid],
        (err: Error, _queryRes: QueryResult<any>) => {
          if (err) {
            res.statusCode = 500
            res.end(err.message)
            return
          }

          res.end()
        }
      )

      break
    case 'post-terminate':
      consola.log('tusd/post-terminate: ' + body.Upload.Storage.Key)
      deleteUpload(
        res,
        body.Upload.MetaData.maevsiUploadUuid,
        body.Upload.Storage.Key
      )

      break
  }
}
