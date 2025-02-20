import { z } from 'zod'

import { pool } from '../utils/dependencies/postgres'

const uploadDeleteQuerySchema = z.object({
  uploadId: z.string(),
})

export default defineEventHandler(async (event) => {
  const verifyAuth = await useVerifyAuth()

  await verifyAuth()

  const query = await getQuerySafe({ event, schema: uploadDeleteQuerySchema })
  const uploadId = query.uploadId

  console.log('tusdDelete: ' + uploadId)

  const queryResult = await pool
    .query('SELECT * FROM maevsi.upload WHERE id = $1;', [uploadId])
    .catch((err) => {
      return throwError({
        code: 500,
        message: err.message,
      })
    })

  if (!queryResult) return

  if (!queryResult.rows.length) {
    return throwError({
      code: 500,
      message: 'No result found for id "' + uploadId + '"!',
    })
  }

  const storageKey = (
    queryResult.rows[0] ? queryResult.rows[0].storage_key : undefined
  ) as string | undefined

  if (!storageKey) {
    return await deleteUpload(event, uploadId)
  }

  const response = await $fetch.raw('http://tusd:8080/files/' + storageKey, {
    headers: {
      'Tus-Resumable': '1.0.0',
    },
    ignoreResponseError: true, // handle response status below
    method: 'DELETE',
  })

  switch (response.status) {
    case 204:
      await deleteUpload(event, uploadId)
      return sendNoContent(event)
    case 404:
      return deleteUpload(event, uploadId)
    default:
      return throwError({
        code: 500,
        message: `Unexpected tusd status code: ${response.status}`,
      })
  }
})
