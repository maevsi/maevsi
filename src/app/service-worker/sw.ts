/// <reference lib="WebWorker" />
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

import { initializeFirebaseClient } from '../utils/dependencies/firebase'

declare let self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})

const firebaseApp = initializeFirebaseClient()
onBackgroundMessage(getMessaging(firebaseApp), (payload) => {
  if (!payload.notification?.title) return

  const { title, body } = payload.notification

  return self.registration.showNotification(title, { body })
})
