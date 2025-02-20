import { type H3Event, send } from 'h3'

import { pool } from './dependencies/postgres'

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
