import type { Message } from 'firebase-admin/messaging'
import { firebaseAdmin } from '../utils/firebase'

export default defineEventHandler(async (_) => {
  const message: Message = {
    notification: {
      title: 'Hello!',
      body: 'Text',
    },
    token: '',
  }

  const re = await firebaseAdmin.messaging().send(message)
  return re
})
