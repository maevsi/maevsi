import { initializeApp, cert } from 'firebase-admin/app'

const getFirebaseAdminApp = () => {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_CREDENTIALS) return

  try {
    return initializeApp({
      credential: cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_CREDENTIALS),
      ),
    })
  } catch (error) {
    console.error('Failed to parse Firebase credentials:', error)
  }
}

export const firebaseAdminApp = getFirebaseAdminApp()
