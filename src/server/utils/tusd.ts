import fs from 'node:fs'

import { createError, type H3Event, send, sendError } from 'h3'
import pg from 'pg'

const secretPostgresDbPath = process.env.POSTGRES_DB_FILE || ''
const secretPostgresRoleMaevsiTusdPasswordPath =
  process.env.POSTGRES_ROLE_MAEVSI_TUSD_PASSWORD_FILE || ''
const secretPostgresRoleMaevsiTusdUsernamePath =
  process.env.POSTGRES_ROLE_MAEVSI_TUSD_USERNAME_FILE || ''

// https://github.com/brianc/node-postgres/issues/2137
// https://github.com/brianc/node-postgres/issues/2353
// eslint-disable-next-line import/no-named-as-default-member
export const pool = new pg.Pool({
  database: fs.existsSync(secretPostgresDbPath)
    ? fs.readFileSync(secretPostgresDbPath, 'utf-8')
    : undefined,
  host: 'postgres',
  password: fs.existsSync(secretPostgresRoleMaevsiTusdPasswordPath)
    ? fs.readFileSync(secretPostgresRoleMaevsiTusdPasswordPath, 'utf-8')
    : undefined,
  user: fs.existsSync(secretPostgresRoleMaevsiTusdUsernamePath)
    ? fs.readFileSync(secretPostgresRoleMaevsiTusdUsernamePath, 'utf-8')
    : undefined,
})

export const deleteUpload = async (event: H3Event, uploadId: any) => {
  let queryResult = await pool
    .query('DELETE FROM maevsi.profile_picture WHERE upload_id = $1;', [
      uploadId,
    ])
    .catch((err: Error) => {
      sendError(
        event,
        createError({ statusCode: 500, statusMessage: err.message }),
      )
    })

  if (!queryResult) return

  queryResult = await pool
    .query('DELETE FROM maevsi.upload WHERE id = $1;', [uploadId])
    .catch((err) => {
      sendError(
        event,
        createError({ statusCode: 500, statusMessage: err.message }),
      )
    })

  if (!queryResult) return

  event.node.res.statusCode = 204
  await send(event)
}
