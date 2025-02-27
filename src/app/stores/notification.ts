export const useNotificationStore = defineStore('notification', () => {
  const fcmToken = ref<string>()
  const permissionState = ref<PermissionState>()

  // Initializes the FCM token, should only be called after a user gave notification permission
  const fcmTokenInitialize = async () => {
    if (hasPushCapability) {
      window.webkit?.messageHandlers['push-token']?.postMessage('push-token')
    } else {
      fcmToken.value = await requestFcmToken()
    }
  }

  return {
    fcmToken,
    fcmTokenInitialize,
    permissionState,
  }
})
