import { type H3Event, MIMES } from 'h3'
import { consola } from 'consola'
import { z } from 'zod'

const tusdPostBodySchema = z.object({
  Type: z.string(),
  Event: z.object({
    Upload: z.object({
      ID: z.string(),
      MetaData: z.object({
        maevsiUploadUuid: z.string(),
      }),
    }),
  }),
})

export default defineEventHandler(async (event: H3Event) => {
  const body = await getBodySafe({ event, schema: tusdPostBodySchema })

  switch (body.Type) {
    case 'pre-create': {
      consola.log('tusd/pre-create')

      const queryResult = await pool
        .query('SELECT EXISTS(SELECT * FROM maevsi.upload WHERE id = $1);', [
          body.Event.Upload.MetaData.maevsiUploadUuid,
        ])
        .catch((err) => {
          return throwError({
            code: 500,
            message: err.message,
          })
        })

      if (!queryResult) return

      if (!queryResult.rows[0].exists) {
        return throwError({
          code: 500,
          message: 'Upload id does not exist!',
        })
      }

      await send(event, JSON.stringify({}), MIMES.json)

      break
    }
    case 'pre-finish': {
      consola.log('tusd/pre-finish: ' + body.Event.Upload.ID)

      const queryRes = await pool
        .query('UPDATE maevsi.upload SET storage_key = $1 WHERE id = $2;', [
          body.Event.Upload.ID,
          body.Event.Upload.MetaData.maevsiUploadUuid,
        ])
        .catch((err) => {
          return throwError({
            code: 500,
            message: err.message,
          })
        })

      if (!queryRes) return

      await send(event, JSON.stringify({}), MIMES.json)

      break
    }
    case 'post-terminate':
      consola.log('tusd/post-terminate: ' + body.Event.Upload.ID)
      await deleteUpload(event, body.Event.Upload.MetaData.maevsiUploadUuid)

      break
    default:
      return throwError({
        code: 500,
        message: 'Invalid hook name header.',
      })
  }
})
