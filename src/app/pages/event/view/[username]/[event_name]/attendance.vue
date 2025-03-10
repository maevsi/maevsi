<template>
  <Loader :api="api" indicator="ping">
    <div
      v-if="event && route.params.username === store.signedInUsername"
      class="flex flex-col gap-4"
    >
      <LayoutPageTitle :title="t('title')" />
      <Steps
        :active="t('qrCodeScan')"
        :steps="[t('qrCodeScan'), t('nfcWrite')]"
      />
      <Hr />
      <div class="flex flex-col items-center justify-center gap-4">
        <ButtonColored :aria-label="t('qrCodeScan')" @click="qrCodeScan">
          {{ t('qrCodeScan') }}
          <template #prefix>
            <IHeroiconsQrCode />
          </template>
        </ButtonColored>
        <FormInputStateInfo v-if="!guestId">
          {{ t('qrHint') }}
        </FormInputStateInfo>
        <CardStateInfo v-if="guestId">
          {{ t('scanned', { scanResult: guestId }) }}
        </CardStateInfo>
        <div v-if="guestId" class="flex flex-col items-center gap-2">
          <ButtonColored
            :aria-label="t('nfcWrite')"
            :disabled="isNfcError"
            class="text-text-bright"
            @click="onClick"
          >
            {{ t('nfcWrite') }}
            <template #prefix>
              <IFa6SolidUserTag />
            </template>
          </ButtonColored>
          <CardStateAlert v-if="isNfcError">
            {{ isNfcWritableErrorMessage }}
          </CardStateAlert>
        </div>
      </div>
      <Modal id="ModalAttendanceScanQrCode" :submit-name="t('close')">
        <QrCodeStream
          @detect="onDetect"
          @error="onError"
          @camera-on="onCameraOn"
        >
          <div v-if="loading" class="text-center">
            {{ t('globalLoading') }}
          </div>
        </QrCodeStream>
        <template #submit-icon>
          <IHeroiconsXCircleSolid />
        </template>
      </Modal>
    </div>
    <Error v-else :status-code="403" />
  </Loader>
</template>

<script lang="ts">
import wasmFile from 'zxing-wasm/reader/zxing_reader.wasm?url'
import { consola } from 'consola'
import {
  setZXingModuleOverrides,
  type DetectedBarcode,
} from 'vue-qrcode-reader'
import type { RouteLocationNormalized } from 'vue-router'
import type { RouteNamedMap } from 'vue-router/auto-routes'

import { useEventByCreatedByAndSlugQuery } from '~~/gql/documents/queries/event/eventByCreatedByAndSlug'
import { getEventItem } from '~~/gql/documents/fragments/eventItem'
import { useAccountByUsernameQuery } from '~~/gql/documents/queries/account/accountByUsername'
import { getAccountItem } from '~~/gql/documents/fragments/accountItem'

const ROUTE_NAME: keyof RouteNamedMap =
  'event-view-username-event_name-attendance___en'

setZXingModuleOverrides({
  locateFile: (path, prefix) => {
    if (path.endsWith('.wasm')) {
      return wasmFile
    }
    return prefix + path
  },
})

export default {
  components: {
    QrCodeStream: defineAsyncComponent(
      async () => (await import('vue-qrcode-reader')).QrcodeStream,
    ),
  },
}
</script>

<script setup lang="ts">
definePageMeta({
  async validate(route) {
    return await validateEventExistence(
      route as RouteLocationNormalized<typeof ROUTE_NAME>,
    )
  },
})

const { t } = useI18n()
const store = useStore()
const route = useRoute(ROUTE_NAME)
const fireAlert = useFireAlert()

// api data
const accountByUsernameQuery = await zalgo(
  useAccountByUsernameQuery({
    username: route.params.username,
  }),
)
const accountId = computed(
  () =>
    getAccountItem(accountByUsernameQuery.data.value?.accountByUsername)?.id,
)
const eventQuery = await zalgo(
  useEventByCreatedByAndSlugQuery({
    createdBy: accountId,
    slug: route.params.event_name,
  }),
)
const event = computed(() =>
  getEventItem(eventQuery.data.value?.eventByCreatedByAndSlug),
)
const api = getApiData([accountByUsernameQuery, eventQuery])

// data
const guestId = ref<string>()
const isNfcWritableErrorMessage = ref<string>()
const loading = ref(true)

// computations
const isNfcError = computed(() => {
  return !!(
    isNfcWritableErrorMessage.value &&
    isNfcWritableErrorMessage.value !== 'prompt'
  )
})
const title = computed(() => {
  if (api.value.isFetching) return t('globalLoading')

  if (!event.value || route.params.username !== store.signedInUsername)
    return '403'

  return `${t('title')} · ${event.value.name}`
})

// methods
const qrCodeScan = () => {
  store.modals.push({ id: 'ModalAttendanceScanQrCode' })
}
const onCameraOn = () => {
  loading.value = false
}
const onError = async (error: Error) => {
  let errorMessage: string = error.message

  if (error.name === 'NotAllowedError') {
    errorMessage = t('errorCameraNotAllowed', {
      hintBrowserSettings: t('hintBrowserSettings'),
    }) as string
  } else if (error.name === 'NotFoundError') {
    errorMessage = t('errorCameraNotFound') as string
  } else if (error.name === 'NotSupportedError') {
    errorMessage = t('errorCameraNotSupported') as string
  } else if (error.name === 'NotReadableError') {
    errorMessage = t('errorCameraNotReadable') as string
  } else if (error.name === 'OverconstrainedError') {
    errorMessage = t('errorCameraOverconstrained') as string
  } else if (error.name === 'StreamApiNotSupportedError') {
    errorMessage = t('errorCameraStreamApiNotSupported') as string
  }

  await fireAlert({ level: 'error', text: errorMessage })
  store.modalRemove('ModalAttendanceScanQrCode')
  consola.error(errorMessage)
}
const onClick = async () => {
  if (!guestId.value) return
  await writeTag(guestId.value)
}
const onDetect = async (detectedBarcodes: DetectedBarcode[]) => {
  if (!detectedBarcodes.length || !detectedBarcodes[0]) return
  guestId.value = detectedBarcodes[0].rawValue
  await fireAlert({ level: 'success' })
  store.modalRemove('ModalAttendanceScanQrCode')
}
const checkWriteTag = async () => {
  if (!('NDEFReader' in window)) {
    return Promise.reject(
      Error(
        t('errorNfcNotSupported', {
          hintUpdateOrChrome: t('hintUpdateOrChrome'),
        }) as string,
      ),
    )
  }

  if (!navigator.permissions) {
    return Promise.reject(
      Error(
        t('errorNavigatorPermissionsNotSupported', {
          hintUpdateOrChrome: t('hintUpdateOrChrome'),
        }) as string,
      ),
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
const writeTag = async (data: string) => {
  try {
    await new NDEFReader().write(data)
    await fireAlert({ level: 'success' })
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

      await fireAlert({ level: 'error', text: errorMessage })
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

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
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
  hintBrowserSettings: Sieh in deinen Browser-Einstellungen nach.
  hintUpdateOrChrome: Versuche deinen Browser zu aktualisieren oder Google Chrome zu verwenden.
  hintTryAgain: Versuch es noch einmal.
  nfcWrite: NFC-Tag schreiben
  qrCodeScan: Check-in-Code scannen
  qrHint: Lass dir von Gästen den QR-Code auf ihrer Einladungsseite zeigen
  scanned: 'Gescannt: {scanResult}'
  title: Check-in
en:
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
  hintBrowserSettings: Check your browser settings.
  hintUpdateOrChrome: Try updating your browser or use Google Chrome.
  hintTryAgain: Try again.
  nfcWrite: Write to NFC tag
  qrCodeScan: Scan check in code
  qrHint: Ask guests to show you the QR code on their invitation page
  scanned: 'Scanned: {scanResult}'
  title: Check in
</i18n>
