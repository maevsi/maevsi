import type { Message } from 'firebase-admin/messaging'
import { firebaseAdmin } from '../utils/firebase'

export default defineEventHandler(async (_) => {
  const message: Message = {
    notification: {
      title: 'Hello!',
      body: 'Text',
    },
    condition: 'true',
  }

  await firebaseAdmin.messaging().send(message)
})
