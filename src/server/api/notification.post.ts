import { firebaseAdmin } from '../utils/firebase'
import { z } from 'zod'

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

  if (runtimeConfig.private.notification.secret === body.secret) {
    return await firebaseAdmin.messaging().send({ ...body.payload })
  }
  return 'NO AUTH'
})
