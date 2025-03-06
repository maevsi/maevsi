import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

export const initializeFirebaseClient = () =>
  initializeApp({
    apiKey: 'AIzaSyCN84hedLiyTvPmB2HGPgpQACQ419xx4zE',
    authDomain: 'maevsi-3f373.firebaseapp.com',
    projectId: 'maevsi-3f373',
    storageBucket: 'maevsi-3f373.firebasestorage.app',
    messagingSenderId: '98545254520',
    appId: '1:98545254520:web:252cec1d26203e2bb36d8d',
    measurementId: 'G-JTPHD951BS',
  })

export const requestFcmToken = async () => {
  const messaging = getMessaging()
  const serviceWorker = await navigator.serviceWorker.ready

  const token = await getToken(messaging, {
    vapidKey:
      'BCbddl5GH4QyQNHjxooJoQ7hB42f2bqjeHrQqwIADPSPtSh9JAZbbXM141gYNtqR5R95Ga7UTIEmzOVvTKxduXQ',
    serviceWorkerRegistration: serviceWorker,
  })

  return token
}
