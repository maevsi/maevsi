import firebaseAdmin from 'firebase-admin'

const getFirebaseAdminApp = () => {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_CREDENTIALS) return

  try {
    return firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_CREDENTIALS),
      ),
    })
  } catch (error) {
    console.error('Failed to parse Firebase credentials:', error)
  }
}

export const firebaseAdminApp = getFirebaseAdminApp()
