import { z } from 'zod'
import { getMessaging } from 'firebase-admin/messaging'

const fcmMessageSchema = z.object({
  payload: z.object({
    notification: z.object({
      title: z.string(),
      body: z.string(),
    }),
    token: z.string(),
  }),
  secret: z.string(),
})

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event)
  const body = await getBodySafe({ event, schema: fcmMessageSchema })

  if (!firebaseAdminApp)
    return throwError({
      code: 500,
      message: 'Firebase uninitialized',
    })

  if (!runtimeConfig.private.api.notification.secret)
    return throwError({
      code: 500,
      message: 'Notification secret uninitialized',
    })

  if (body.secret !== runtimeConfig.private.api.notification.secret)
    return throwError({
      code: 403,
      message: 'Invalid secret',
    })

  return getMessaging(firebaseAdminApp).send({ ...body.payload })
})
