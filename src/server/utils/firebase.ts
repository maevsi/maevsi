import admin from 'firebase-admin'

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(''),
})
