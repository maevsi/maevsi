declare const window: Window & {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  webkit?: any
}

export const useNotificationStore = defineStore('notification', () => {
  const hasPushCapability =
    window &&
    window.webkit?.messageHandlers?.['push-permission-state'] !== undefined &&
    window.webkit?.messageHandlers?.['push-permission-request'] !== undefined

  const notificationPermissionState = ref<PermissionState>()
  const fcmToken = ref<string>()

  // Requests the app to open the notification dialog
  const requestNotificationPermission = () => {
    if (hasPushCapability) {
      window.webkit.messageHandlers['push-permission-request'].postMessage(
        'push-permission-request',
      )
    } else {
      Notification.requestPermission(
        (notificationPermission) =>
          (notificationPermissionState.value =
            notificationPermission === 'default'
              ? 'prompt'
              : notificationPermission),
      )
    }
  }

  // Requests the current notification permission state
  const requestNotificationPermissionState = async () => {
    if (hasPushCapability) {
      window.webkit.messageHandlers['push-permission-state'].postMessage(
        'push-permission-state',
      )
    } else {
      const permissionStatus = await navigator.permissions.query({
        name: 'notifications',
      })
      notificationPermissionState.value = permissionStatus.state
    }
  }

  // Initializes the FCM token, should only be called after a user gave notification permission
  const initializeFcmToken = async () => {
    if (hasPushCapability) {
      window.webkit.messageHandlers['push-token'].postMessage('push-token')
    } else {
      fcmToken.value = await requestFcmToken()
    }
  }

  const fcmTokenSet = (token: string) => {
    fcmToken.value = token
  }

  const notificationPermissionSet = (permission: PermissionState) => {
    notificationPermissionState.value = permission
  }

  return {
    hasPushCapability,
    notificationPermissionState,
    fcmToken,
    fcmTokenSet,
    initializeFcmToken,
    requestNotificationPermission,
    requestNotificationPermissionState,
    notificationPermissionSet,
  }
})

export const registerIosCallbackHandler = (
  store: ReturnType<typeof useNotificationStore>,
) => {
  // @ts-expect-error Type checker is confused with custom event handler
  window.addEventListener('push-token', (event: CustomEvent) => {
    const { fcmTokenSet } = store
    if (event && event.detail && event.detail !== 'ERROR GET TOKEN') {
      fcmTokenSet(event.detail)
    }
  })

  // @ts-expect-error Type checker is confused with custom event handler
  window.addEventListener('push-permission-request', (event: CustomEvent) => {
    const { notificationPermissionSet } = store
    if (event && event.detail) {
      if (event.detail === 'granted') {
        notificationPermissionSet('granted')
      } else {
        notificationPermissionSet('denied')
      }
    }
  })

  // @ts-expect-error Type checker is confused with custom event handler
  window.addEventListener('push-permission-state', (event: CustomEvent) => {
    const { notificationPermissionSet } = store
    if (event && event.detail) {
      switch (event.detail) {
        case 'authorized':
        case 'ephemeral':
        case 'provisional':
          notificationPermissionSet('granted')
          break
        case 'notDetermined':
        case 'denied':
        case 'unknown':
        default:
          notificationPermissionSet('denied')
          break
      }
    }
  })
}
