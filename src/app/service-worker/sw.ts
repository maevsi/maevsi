/// <reference lib="WebWorker" />
import { getMessaging } from 'firebase/messaging/sw'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

import { initializeFirebaseClient } from '../utils/dependencies/firebase'

declare let self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})

initializeFirebaseClient()
getMessaging()
