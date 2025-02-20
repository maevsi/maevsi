import { type H3Event, send } from 'h3'
import pg from 'pg'

// https://github.com/brianc/node-postgres/issues/2137
// https://github.com/brianc/node-postgres/issues/2353

export const pool = new pg.Pool({
  database: process.env.PGDATABASE,
  host: 'postgres',
  password: process.env.PGPASSWORD,
  user: process.env.PGUSER,
})

export const deleteUpload = async (event: H3Event, uploadId: unknown) => {
  let queryResult = await pool
    .query('DELETE FROM maevsi.profile_picture WHERE upload_id = $1;', [
      uploadId,
    ])
    .catch((err: Error) => {
      return throwError({
        code: 500,
        message: err.message,
      })
    })

  if (!queryResult) return

  queryResult = await pool
    .query('DELETE FROM maevsi.upload WHERE id = $1;', [uploadId])
    .catch((err) => {
      return throwError({
        code: 500,
        message: err.message,
      })
    })

  if (!queryResult) return

  event.node.res.statusCode = 204
  await send(event)
}

export const useTusdFilesUrl = () => {
  const { siteUrlTyped: siteUrl } = useSiteUrl()

  return getTusdFilesUrl({ siteUrl })
}
