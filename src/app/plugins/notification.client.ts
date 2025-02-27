export default defineNuxtPlugin(() => {
  const notificationStore = useNotificationStore()

  if (hasPushCapability) {
    registerIosCallbackHandler(notificationStore)
  } else {
    initializeFirebaseClient()
  }
})
