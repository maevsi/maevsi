<template>
  <div>
    <LayoutPageTitle :title="title" />
    <div class="flex flex-col gap-8">
      <section class="flex flex-col gap-4">
        <h2>{{ t('end') }}</h2>
        <div class="grid gap-4 lg:grid-cols-2">
          <div class="flex-1">
            <Card>
              {{
                store.jwtDecoded
                  ? t('sessionExpiry', { exp: sessionExpiryTime })
                  : t('sessionExpiryNone')
              }}
            </Card>
          </div>
          <div class="flex-1">
            <div class="flex flex-col gap-2">
              <ButtonColored
                :aria-label="t('endNow')"
                :disabled="!store.jwtDecoded"
                :is-primary="false"
                @click="signOut"
              >
                {{ t('endNow') }}
                <template #prefix>
                  <IHeroiconsOutlineLogout />
                </template>
              </ButtonColored>
            </div>
          </div>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <h2>{{ t('codes') }}</h2>
        <div class="grid gap-4 lg:grid-cols-2">
          <div class="flex-1">
            <Card>
              <div v-if="store.jwtDecoded?.invitations">
                <p>
                  {{ t('codesEntered') }}
                </p>
                <ul class="list-disc">
                  <li
                    v-for="guestId in store.jwtDecoded?.guests"
                    :key="guestId"
                  >
                    {{ guestId }}
                  </li>
                </ul>
              </div>
              <p v-else>
                {{ t('codesEnteredNone') }}
              </p>
            </Card>
          </div>
          <div class="flex-1">
            <div class="flex flex-col">
              <ButtonEventUnlock />
            </div>
          </div>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <h2>{{ t('userAgentString') }}</h2>
        <div class="grid gap-4 lg:grid-cols-2">
          <div class="flex-1">
            <Card>
              {{ userAgentString }}
            </Card>
          </div>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <h2>{{ t('notification') }}</h2>
        <div class="flex flex-col gap-4 lg:flex-row">
          <section class="flex-1">
            <Card class="flex flex-col gap-1">
              <div class="flex gap-2">
                <IHeroiconsQuestionMarkCircle
                  v-if="isNavigatorHavingPermissions === undefined"
                />
                <IHeroiconsCheckCircle
                  v-else-if="isNavigatorHavingPermissions"
                  class="text-green-600 dark:text-green-500"
                />
                <IHeroiconsXCircle
                  v-else
                  class="text-red-600 dark:text-red-500"
                />
                <span>
                  {{ t('hasNavigatorPermissions') }}
                </span>
              </div>
              <div class="flex gap-2">
                <IHeroiconsQuestionMarkCircle
                  v-if="isNavigatorHavingServiceWorker === undefined"
                />
                <IHeroiconsCheckCircle
                  v-else-if="isNavigatorHavingServiceWorker"
                  class="text-green-600 dark:text-green-500"
                />
                <IHeroiconsXCircle
                  v-else
                  class="text-red-600 dark:text-red-500"
                />
                <span>
                  {{ t('hasNavigatorServiceWorkers') }}
                </span>
              </div>
              <div class="flex gap-2">
                <IHeroiconsQuestionMarkCircle
                  v-if="isWindowHavingNotification === undefined"
                />
                <IHeroiconsCheckCircle
                  v-else-if="isWindowHavingNotification"
                  class="text-green-600 dark:text-green-500"
                />
                <IHeroiconsXCircle
                  v-else
                  class="text-red-600 dark:text-red-500"
                />
                <span>
                  {{ t('hasWindowNotification') }}
                </span>
              </div>
              <div class="flex gap-2">
                <IHeroiconsQuestionMarkCircle
                  v-if="isIosHavingPushCapability === undefined"
                />
                <IHeroiconsCheckCircle
                  v-else-if="isIosHavingPushCapability"
                  class="text-green-600 dark:text-green-500"
                />
                <IHeroiconsXCircle
                  v-else
                  class="text-red-600 dark:text-red-500"
                />
                <span>
                  {{ t('hasIosPushCapability') }}
                </span>
              </div>
              <div class="flex gap-2">
                <IHeroiconsQuestionMarkCircle
                  v-if="permissionState === undefined"
                />
                <IHeroiconsCheckCircle
                  v-else-if="permissionState === 'granted'"
                  class="text-green-600 dark:text-green-500"
                />
                <IHeroiconsQuestionMarkCircle
                  v-else-if="permissionState === 'prompt'"
                  class="text-blue-600 dark:text-blue-400"
                />
                <IHeroiconsXCircle
                  v-else-if="permissionState === 'denied'"
                  class="text-red-600 dark:text-red-500"
                />
                <IHeroiconsBugAnt v-else class="text-red-500" />
                <span>
                  {{ t('notificationPermitted') }}
                </span>
              </div>
            </Card>
          </section>
          <section class="flex-1">
            <div class="flex flex-col gap-2">
              <ButtonColored
                :aria-label="t('notificationPermit')"
                :disabled="!isNotificationPermissionRequestPossible"
                :is-primary="false"
                @click="requestNotificationPermission(notificationStore)"
              >
                {{ t('notificationPermit') }}
                <template #prefix>
                  <IHeroiconsShieldCheck />
                </template>
              </ButtonColored>
              <ButtonColored
                :aria-label="t('notificationSend')"
                :disabled="permissionState !== 'granted'"
                :is-primary="false"
                @click="sendNotification"
              >
                {{ t('notificationSend') }}
                <template #prefix>
                  <IHeroiconsBellAlert />
                </template>
              </ButtonColored>
              <ButtonColored
                :aria-label="t('showFcmToken')"
                :is-primary="false"
                @click="showFcmToken"
              >
                {{ t('showFcmToken') }}
                <template #prefix>
                  <IHeroiconsClipboard />
                </template>
              </ButtonColored>
            </div>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { consola } from 'consola'

const { t } = useI18n()
const requestEvent = useRequestEvent()
const store = useStore()
const notificationStore = useNotificationStore()
const dateTime = useDateTime()
const { signOut } = await useSignOut()
const fireAlert = useFireAlert()

// data
const isNavigatorHavingPermissions = ref<boolean>()
const isNavigatorHavingServiceWorker = ref<boolean>()
const isWindowHavingNotification = ref<boolean>()
const isIosHavingPushCapability = ref<boolean>()
const permissionState = ref<PermissionState>()
const title = t('title')

// methods
const sendNotification = async () => {
  const serviceWorkerRegistration = await navigator.serviceWorker.ready

  serviceWorkerRegistration.showNotification('Hey cutie 👋', {
    body: "It's great to see you!",
    icon: '/assets/static/logos/app_icon.svg',
    tag: 'test',
  })
}
const showFcmToken = async () => {
  if (!notificationStore.fcmToken) {
    await notificationStore.fcmTokenInitialize()
  }

  await fireAlert({
    level: 'info',
    title: 'FCM Token',
    text: notificationStore.fcmToken,
  })
}

// computations
const isNotificationPermissionRequestPossible = computed(
  () =>
    (import.meta.client &&
      isWindowHavingNotification.value &&
      permissionState.value === 'prompt') ||
    isIosHavingPushCapability,
)
const sessionExpiryTime = computed(() =>
  store.jwtDecoded?.exp
    ? dateTime(store.jwtDecoded?.exp * 1000).format('llll')
    : undefined,
)
const userAgentString = computed(() =>
  requestEvent ? requestEvent.headers.get('user-agent') : navigator.userAgent,
)

// lifecycle
onMounted(async () => {
  isNavigatorHavingPermissions.value = 'permissions' in navigator
  isNavigatorHavingServiceWorker.value = 'serviceWorker' in navigator
  isWindowHavingNotification.value = 'Notification' in window
  isIosHavingPushCapability.value = (() => {
    const windowWebkit = window as unknown as {
      webkit?: { messageHandlers?: Record<string, unknown> }
    }
    return (
      windowWebkit.webkit?.messageHandlers?.['push-permission-state'] !==
        undefined &&
      windowWebkit.webkit?.messageHandlers?.['push-permission-request'] !==
        undefined
    )
  })()

  if (isNavigatorHavingPermissions.value) {
    const permissionStatus = await navigator.permissions.query({
      name: 'notifications',
    })

    permissionStatus.addEventListener('change', async () => {
      consola.log(
        'User decided to change his settings. New permission: ' +
          permissionStatus.state,
      )
      permissionState.value = permissionStatus.state
    })

    permissionState.value = permissionStatus.state
  }

  if (!permissionState.value && isWindowHavingNotification.value) {
    permissionState.value =
      Notification.permission === 'default' ? 'prompt' : Notification.permission
  }
})

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  codes: Einladungscodes
  codesEntered: 'Du hast die folgenden Codes eingegeben:'
  codesEnteredNone: Dieser Sitzung sind keine Einladungscodes zugeordnet.
  end: Ende
  endNow: Diese Sitzung beenden
  hasIosPushCapability: Fenster hat Push-Fähigkeit (iOS)
  hasNavigatorPermissions: Navigator hat Berechtigungen
  hasNavigatorServiceWorkers: Navigator hat Service Worker
  hasWindowNotification: Fenster hat Benachrichtigung
  notification: Benachrichtigungen
  notificationPermit: Benachrichtigungen erlauben
  notificationPermitted: Benachrichtigungen sind erlaubt
  notificationSend: Benachrichtigung senden
  sessionExpiry: Deine Sitzung läuft am {exp} ab.
  sessionExpiryNone: Es sind keine Sitzungsdaten verfügbar.
  showFcmToken: FCM Token anzeigen
  title: Sitzung
  userAgentString: User agent string
en:
  codes: Invitation codes
  codesEntered: 'You entered the following codes:'
  codesEnteredNone: There are no invitation codes assigned to this session.
  end: End
  endNow: End this session
  hasIosPushCapability: Window has Push-Capability (iOS)
  hasNavigatorPermissions: Navigator has permissions
  hasNavigatorServiceWorkers: Navigator has service workers
  hasWindowNotification: Window has notification
  notification: Notifications
  notificationPermit: Permit notifications
  notificationPermitted: Notifications are permitted
  notificationSend: Send notification
  sessionExpiry: Your session expires on {exp}.
  sessionExpiryNone: No session data is available.
  showFcmToken: Show FCM Token
  title: Session
  userAgentString: User agent string
</i18n>
