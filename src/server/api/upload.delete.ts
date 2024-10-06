import type { H3Event } from 'h3'
import { consola } from 'consola'
import { z } from 'zod'

import { verifyAuth } from '../utils/auth'
import { getQuerySafe } from '../utils/validation'

const uploadDeleteQuerySchema = z.object({
  uploadId: z.string(),
})

export default defineEventHandler(async (event: H3Event) => {
  await verifyAuth(event)

  const query = await getQuerySafe({ event, schema: uploadDeleteQuerySchema })
  const uploadId = query.uploadId

  consola.log('tusdDelete: ' + uploadId)

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
      event.node.res.statusCode = 204
      await send(event)
      break
    case 404:
      await deleteUpload(event, uploadId)
      break
    default:
      return throwError({
        code: 500,
        message: `Unexpected tusd status code: ${response.status}`,
      })
  }
})
