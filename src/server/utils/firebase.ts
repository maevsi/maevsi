import admin from 'firebase-admin'

export const firebaseAdmin = process.env.FIREBASE_SERVICE_ACCOUNT_CREDENTIALS
  ? admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_CREDENTIALS),
      ),
    })
  : undefined
