import { createError, readBody, type H3Event, send, sendError, MIMES } from 'h3'
import { consola } from 'consola'

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)

  switch (body.Type) {
    case 'pre-create': {
      consola.log('tusd/pre-create')

      const queryRes = await pool
        .query('SELECT EXISTS(SELECT * FROM maevsi.upload WHERE id = $1);', [
          body.Event.Upload.MetaData.maevsiUploadUuid,
        ])
        .catch((err) => {
          sendError(
            event,
            createError({ statusCode: 500, statusMessage: err.message }),
          )
        })

      if (!queryRes) return

      if (!queryRes.rows[0].exists) {
        return sendError(
          event,
          createError({
            statusCode: 500,
            statusMessage: 'Upload id does not exist!',
          }),
        )
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
          sendError(
            event,
            createError({
              statusCode: 500,
              statusMessage: err.message,
            }),
          )
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
      sendError(
        event,
        createError({
          statusCode: 500,
          statusMessage: 'Invalid hook name header.',
        }),
      )
  }
})
