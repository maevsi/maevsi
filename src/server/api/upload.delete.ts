import { z } from 'zod'

const uploadDeleteQuerySchema = z.object({
  uploadId: z.string(),
})

export default defineEventHandler(async (event) => {
  const { getJwtFromHeader, verifyJwt } = await useJsonWebToken()

  const jwtDecoded = await verifyJwt(getJwtFromHeader())
  if (!(jwtDecoded.role === `${SITE_NAME}_account`))
    return throwError({
      code: 403,
      message: 'This endpoint only available to registered users.',
    })

  const query = await getQuerySafe({ event, schema: uploadDeleteQuerySchema })
  const uploadId = query.uploadId

  console.log('tusdDelete: ' + uploadId)

  const queryResult = await executeQuery(uploadSelect({ id: uploadId }))

  if (!queryResult.length) {
    return throwError({
      code: 500,
      message: `No result found for id "${uploadId}"!`,
    })
  }

  const storageKey = queryResult[0]?.storage_key

  if (!storageKey) {
    return await deleteUpload(event, uploadId)
  }

  const response = await $fetch.raw(`http://tusd:8080/files/${storageKey}`, {
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
