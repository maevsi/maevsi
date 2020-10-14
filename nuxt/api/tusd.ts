/* eslint-disable no-console */
const fs = require('fs')

const secretPostgresDbPath = '/run/secrets/postgres_db'
const secretPostgraphileJwtSecretPath = '/run/secrets/postgraphile_jwt-secret'
const secretPostgresRoleMaevsiTusdPasswordPath =
  '/run/secrets/postgres_role_maevsi-tusd_password'

const secretPostgraphileJwtSecret = fs.existsSync(
  secretPostgraphileJwtSecretPath
)
  ? fs.readFileSync(secretPostgraphileJwtSecretPath, 'utf-8')
  : undefined

const { Pool } = require('pg')

const pool = new Pool({
  database: fs.existsSync(secretPostgresDbPath)
    ? fs.readFileSync(secretPostgresDbPath, 'utf-8')
    : undefined,
  host: 'postgres',
  password: fs.existsSync(secretPostgresRoleMaevsiTusdPasswordPath)
    ? fs.readFileSync(secretPostgresRoleMaevsiTusdPasswordPath, 'utf-8')
    : undefined,
  user: 'maevsi_tusd', // lgtm [js/hardcoded-credentials]
})

function deleteUpload(res: any, uploadId: any, storageKey: any) {
  pool.query(
    'DELETE FROM maevsi.profile_picture WHERE upload_storage_key = $1;',
    [storageKey],
    (err: any, _queryRes: any) => {
      if (err) {
        res.status(500).send(err)
        return
      }

      pool.query(
        'DELETE FROM maevsi.upload WHERE id = $1;',
        [uploadId],
        (err: any, _queryRes: any) => {
          if (err) {
            res.status(500).send(err)
            return
          }

          res.status(204).end()
        }
      )
    }
  )
}

function tusdDelete(req: any, res: any) {
  const uploadId = req.query.uploadId

  if (uploadId === undefined) {
    res.status(422).send('The request query parameter "uploadId" is undefined!')
    return
  }

  console.log('tusdDelete: ' + uploadId)

  if (req.header('Authorization') === undefined) {
    res.status(401).send('The request header "Authorization" is undefined!')
    return
  }

  if (secretPostgraphileJwtSecret === undefined) {
    res.status(500).send('Secret missing!')
    return
  }

  const jsonwebtoken = require('jsonwebtoken')

  try {
    jsonwebtoken.verify(
      req.header('Authorization').substring(7),
      secretPostgraphileJwtSecret,
      {
        audience: 'postgraphile',
        issuer: 'postgraphile',
      }
    )
  } catch (err) {
    res
      .status(401)
      .send('Json web token verification failed: "' + err.message + '"!')
    return
  }

  pool.query(
    'SELECT * FROM maevsi.upload WHERE id = $1;',
    [uploadId],
    (err: any, queryRes: any) => {
      if (err) {
        res.status(500).send(err)
        return
      }

      if (queryRes.rows.length === 0) {
        res.status(500).send('No result found for id "' + uploadId + '"!')
      }

      const storageKey = queryRes.rows[0].storage_key

      if (storageKey !== null) {
        const http = require('http')

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
                  res.status(204).end()
                } else if (httpResp.statusCode === 404) {
                  deleteUpload(res, uploadId, storageKey)
                } else {
                  res
                    .status(500)
                    .send('Tusd status was "' + httpResp.statusCode + '".')
                }
              })
            }
          )
          .on('error', (err: any) => {
            res
              .status(500)
              .send('Internal delete failed: "' + err.message + '"!')
          })

        reqTusd.end()
      } else {
        deleteUpload(res, uploadId, storageKey)
      }
    }
  )
}

function tusdPost(req: any, res: any) {
  switch (req.get('Hook-Name')) {
    case 'pre-create':
      console.log('tusd/pre-create')

      pool.query(
        'SELECT EXISTS(SELECT * FROM maevsi.upload WHERE id = $1);',
        [req.body.Upload.MetaData.maevsiUploadId],
        (err: any, queryRes: any) => {
          if (err) {
            res.status(500).send(err)
            return
          }

          if (!queryRes.rows[0].exists) {
            res.status(500).send('Upload id does not exist!')
            return
          }

          res.end()
        }
      )

      break
    case 'post-finish':
      console.log('tusd/post-finish: ' + req.body.Upload.Storage.Key)

      pool.query(
        'UPDATE maevsi.upload SET storage_key = $1 WHERE id = $2;',
        [req.body.Upload.Storage.Key, req.body.Upload.MetaData.maevsiUploadId],
        (err: any, _queryRes: any) => {
          if (err) {
            res.status(500).send(err)
            return
          }

          res.end()
        }
      )

      break
    case 'post-terminate':
      console.log('tusd/post-terminate: ' + req.body.Upload.Storage.Key)
      deleteUpload(
        res,
        req.body.Upload.MetaData.maevsiUploadId,
        req.body.Upload.Storage.Key
      )

      break
  }
}

export default function (req: any, res: any, _next: any) {
  switch (req.method) {
    case 'delete':
      tusdDelete(req, res)
      break
    case 'post':
      tusdPost(req, res)
      break
    default:
      console.warn('Unexpected request method.')
  }
}
