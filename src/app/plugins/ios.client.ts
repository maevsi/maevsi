export default defineNuxtPlugin(() => {
  const notificationStore = useNotificationStore()
  if (notificationStore.hasPushCapability)
    registerIosCallbackHandler(notificationStore)
})
