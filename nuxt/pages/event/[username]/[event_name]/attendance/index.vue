<template>
  <div class="flex flex-col gap-4">
    <Breadcrumbs
      :prefixes="[
        { name: t('events'), to: '../../..', isToRelative: true },
        { name: routeParamUsername, to: '../..', isToRelative: true },
        { name: routeParamEventName, to: '..', isToRelative: true },
      ]"
    >
      {{ t('checkIns') }}
    </Breadcrumbs>
    <h1>
      {{ t('title') }}
    </h1>
    <Steps
      :active="t('qrCodeScan')"
      :steps="[t('qrCodeScan'), t('nfcWrite')]"
    />
    <Hr />
    <div class="flex flex-col items-center justify-center gap-4">
      <ButtonColored
        :aria-label="t('qrCodeScan')"
        class="text-text-bright"
        @click="qrCodeScan"
      >
        {{ t('qrCodeScan') }}
        <template #prefix>
          <IconQrCode />
        </template>
      </ButtonColored>
      <FormInputStateInfo v-if="!invitationCode">
        {{ t('qrHint') }}
      </FormInputStateInfo>
      <CardStateInfo v-if="invitationCode">
        {{ t('scanned', { scanResult: invitationCode }) }}
      </CardStateInfo>
      <div v-if="invitationCode" class="flex flex-col items-center gap-2">
        <ButtonColored
          :aria-label="t('nfcWrite')"
          :disabled="isNfcError"
          class="text-text-bright"
          @click="onClick"
        >
          {{ t('nfcWrite') }}
          <template #prefix>
            <IconUserTag />
          </template>
        </ButtonColored>
        <CardStateAlert v-if="isNfcError">
          {{ isNfcWritableErrorMessage }}
        </CardStateAlert>
      </div>
    </div>
    <Modal id="ModalAttendanceScanQrCode" :submit-name="t('close')">
      <!-- <QrCodeStream @decode="onDecode" @init="onInit">
        <div v-if="loading" class="text-center">
          {{ t('globalLoading') }}
        </div>
      </QrCodeStream> -->
      <template #submit-icon>
        <IconXCircle />
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import consola from 'consola'
import Swal from 'sweetalert2'

import { useEventByAuthorUsernameAndSlugQuery } from '~/gql/generated'
import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'
import { useMaevsiStore } from '~/store'

definePageMeta({
  async validate(route) {
    const { $urql } = useNuxtApp()

    const eventIsExisting = await $urql.value
      .query(EVENT_IS_EXISTING_QUERY, {
        slug: route.params.event_name as string,
        authorUsername: route.params.username as string,
      })
      .toPromise()

    return !eventIsExisting.error && !!eventIsExisting.data?.eventIsExisting
  },
  middleware: [
    function (_to: any, _from: any) {
      const route = useRoute()
      const store = useMaevsiStore()

      if (route.params.username !== store.signedInUsername) {
        throw createError({ statusCode: 403 }) // TODO: abortNavigation?
      }
    },
  ],
})

const { t } = useI18n()
const store = useMaevsiStore()
const route = useRoute()

// queries
const eventQuery = useEventByAuthorUsernameAndSlugQuery({
  variables: {
    authorUsername: route.params.username as string,
    slug: route.params.event_name as string,
  },
})

// api data
const event = computed(
  () => eventQuery.data.value?.eventByAuthorUsernameAndSlug
)

// data
const invitationCode = ref<string>()
const isNfcWritableErrorMessage = ref<string>()
// const loading = ref(false)
const routeParamEventName = route.params.event_name as string
const routeParamUsername = route.params.username as string

// computations
const isNfcError = computed(() => {
  return !!(
    isNfcWritableErrorMessage.value &&
    isNfcWritableErrorMessage.value !== 'prompt'
  )
})
const title = computed(() => {
  if (route.params.username === store.signedInUsername && event.value) {
    return `${t('title')} · ${event.value.name}`
  }
  return '403'
})

// methods
function qrCodeScan() {
  store.modalAdd({ id: 'ModalAttendanceScanQrCode' })
}
// async function onInit(promise: Promise<any>) {
//   loading.value = true

//   try {
//     await promise
//   } catch (error: any) {
//     let errorMessage: string = error.message

//     if (error.name === 'NotAllowedError') {
//       errorMessage = t('errorCameraNotAllowed', {
//         hintBrowserSettings: t('hintBrowserSettings'),
//       }) as string
//     } else if (error.name === 'NotFoundError') {
//       errorMessage = t('errorCameraNotFound') as string
//     } else if (error.name === 'NotSupportedError') {
//       errorMessage = t('errorCameraNotSupported') as string
//     } else if (error.name === 'NotReadableError') {
//       errorMessage = t('errorCameraNotReadable') as string
//     } else if (error.name === 'OverconstrainedError') {
//       errorMessage = t('errorCameraOverconstrained') as string
//     } else if (error.name === 'StreamApiNotSupportedError') {
//       errorMessage = t('errorCameraStreamApiNotSupported') as string
//     }

//     Swal.fire({
//       icon: 'error',
//       text: errorMessage,
//       title: t('globalStatusError'),
//     }).then(() => store.modalRemove('ModalAttendanceScanQrCode'))
//     consola.error(errorMessage)
//   } finally {
//     loading.value = false
//   }
// }
async function onClick() {
  await writeTag(invitationCode.value)
}
// function onDecode(e: any): void {
//   invitationCode.value = e
//   Swal.fire({
//     icon: 'success',
//     showConfirmButton: false,
//     timer: 1500,
//     timerProgressBar: true,
//   }).then(() => store.modalRemove('ModalAttendanceScanQrCode'))
// }
async function checkWriteTag(): Promise<void> {
  if (!('NDEFReader' in window)) {
    return Promise.reject(
      Error(
        t('errorNfcNotSupported', {
          hintUpdateOrChrome: t('hintUpdateOrChrome'),
        }) as string
      )
    )
  }

  if (!navigator.permissions) {
    return Promise.reject(
      Error(
        t('errorNavigatorPermissionsNotSupported', {
          hintUpdateOrChrome: t('hintUpdateOrChrome'),
        }) as string
      )
    )
  } else {
    const nfcPermissionStatus = await navigator.permissions.query({
      name: 'nfc' as PermissionName,
    })

    if (nfcPermissionStatus.state === 'granted') {
      return Promise.resolve()
    } else {
      return Promise.reject(Error(nfcPermissionStatus.state))
    }
  }
}
async function writeTag(e: any): Promise<void> {
  try {
    await new NDEFReader().write(e)
    Swal.fire({
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    })
  } catch (error) {
    if (error instanceof DOMException) {
      let errorMessage: string = error.message

      if (error.name === 'AbortError') {
        errorMessage = t('errorNfcAbort', {
          hintTryAgain: t('hintTryAgain'),
        }) as string
      } else if (error.name === 'NotAllowedError') {
        errorMessage = t('errorNfcNotAllowed', {
          hintBrowserSettings: t('hintBrowserSettings'),
        }) as string
      } else if (error.name === 'NotSupportedError') {
        errorMessage = t('errorNfcNotSupported') as string
      } else if (error.name === 'NotReadableError') {
        errorMessage = t('errorNfcNotReadable') as string
      } else if (error.name === 'NetworkError') {
        errorMessage = t('errorNfcNetwork', {
          hintTryAgain: t('hintTryAgain'),
        }) as string
      }

      Swal.fire({
        icon: 'error',
        text: errorMessage,
        title: t('globalStatusError'),
      })
      consola.error(errorMessage)
    } else {
      alert(`Unexpected error: ${error}`)
    }
  }
}

// lifecycle
onMounted(() => {
  checkWriteTag().catch((err: Error) => {
    isNfcWritableErrorMessage.value = err.message
  })
})
watch(eventQuery.error, (currentValue, _oldValue) => {
  if (currentValue) consola.error(currentValue)
})

// initialization
useHeadDefault(title.value)
</script>

<script lang="ts">
export default {
  name: 'IndexPage',
  components: {
    // TODO: https://github.com/nuxt/framework/issues/6781
    // QrCodeStream: defineAsyncComponent(
    //   () => import('vue-qrcode-reader/src/components/QrcodeStream.vue')
    // ),
  },
}
</script>

<i18n lang="yml">
de:
  checkIns: Check-in
  close: Schließen
  errorCameraNotAllowed: Berechtigung zum Kamerazugriff fehlt. {hintBrowserSettings}
  errorCameraNotFound: Konnte keine geeignete Kamera finden.
  errorCameraNotReadable: Zugriff auf die Kamera nicht möglich. Wird sie von einem anderen Programm verwendet?
  errorCameraNotSupported: Die Webseite wird nicht über eine sichere Verbindung geladen.
  errorCameraOverconstrained: Frontkamerazugriff ist nicht möglich.
  errorCameraStreamApiNotSupported: Der Browser unterstützt den Zugriff auf Videostreams nicht.
  errorNavigatorPermissionsNotSupported: Navigator-Berechtigungen werden nicht unterstützt! {hintUpdateOrChrome}
  errorNfcAbort: Der NFC-Scan wurde unterbrochen! {hintTryAgain}
  errorNfcNetwork: Die NFC-Übertragung wurde unterbrochen! {hintTryAgain}
  errorNfcNotAllowed: Berechtigung zum NFC-Zugriff fehlt! {hintBrowserSettings}
  errorNfcNotReadable: Zugriff auf den NFC-Adapter nicht möglich. Wird er von einem anderen Programm verwendet?
  errorNfcNotSupported: Es wurde kein kompatibler NFC-Adapter gefunden. {hintUpdateOrChrome}
  events: Veranstaltungen
  hintBrowserSettings: Sieh in deinen Browser-Einstellungen nach.
  hintUpdateOrChrome: Versuche deinen Browser zu aktualisieren oder Google Chrome zu verwenden.
  hintTryAgain: Versuch es noch einmal.
  nfcWrite: NFC-Tag schreiben
  qrCodeScan: Check-in-Code scannen
  qrHint: Lass dir von Gästen den QR-Code auf ihrer Einladungsseite zeigen
  scanned: 'Gescannt: {scanResult}'
  title: Check-in
en:
  checkIns: check in
  close: Close
  errorCameraNotAllowed: Need camera access permissons.
  errorCameraNotFound: Could not find a suitable camera.
  errorCameraNotReadable: Could not access camera. Is it in use by another program right now?
  errorCameraNotSupported: The web page is not loaded over a secure connection.
  errorCameraOverconstrained: Could not access front camera.
  errorCameraStreamApiNotSupported: Your browser does not support access to video streams.
  errorNavigatorPermissionsNotSupported: Navigator permissions are not supported! {hintUpdateOrChrome}
  errorNfcAbort: The NFC scan was interrupted! {hintTryAgain}
  errorNfcNetwork: The NFC transmission was interrupted! {hintTryAgain}
  errorNfcNotAllowed: Need NFC access permission! {hintBrowserSettings}
  errorNfcNotReadable: Could not access NFC adapter. Is it in use by another program right now?
  errorNfcNotSupported: No compatible NFC adapter was found. {hintUpdateOrChrome}
  events: events
  hintBrowserSettings: Check your browser settings.
  hintUpdateOrChrome: Try updating your browser or use Google Chrome.
  hintTryAgain: Try again.
  nfcWrite: Write to NFC tag
  qrCodeScan: Scan check in code
  qrHint: Ask guests to show you the QR code on their invitation page
  scanned: 'Scanned: {scanResult}'
  title: Check in
</i18n>
