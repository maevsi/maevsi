<template>
  <div class="flex flex-col gap-4">
    <Breadcrumbs
      :prefixes="[
        { name: t('events'), to: '../../..', append: true },
        { name: routeParamUsername, to: '../..', append: true },
        { name: routeParamEventName, to: '..', append: true },
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
        <template slot="prefix">
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
          <template slot="prefix">
            <IconUserTag />
          </template>
        </ButtonColored>
        <CardStateAlert v-if="isNfcError">
          {{ isNfcWritableErrorMessage }}
        </CardStateAlert>
      </div>
    </div>
    <Modal id="ModalAttendanceScanQrCode" :submit-name="t('close')">
      <QrCodeStream @decode="onDecode" @init="onInit">
        <div v-if="loading" class="text-center">
          {{ t('globalLoading') }}
        </div>
      </QrCodeStream>
      <template slot="submit-icon">
        <IconXCircle />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import consola from 'consola'
import Swal from 'sweetalert2'
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useRouter, useRoute, abortNavigation } from '#app'
import { useHead } from '#head'

import {
  useEventByAuthorUsernameAndSlugQuery,
  useEventIsExistingQuery,
} from '~/gql/generated'
import { getApiMeta } from '~/plugins/util/util'
import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const route = useRoute()
      const store = useMaevsiStore()

      if (route.params.username !== store.signedInUsername) {
        throw createError({ statusCode: 403 })
        // return error({ statusCode: 403 })
      }

      const eventIsExisting = useEventIsExistingQuery({
        variables: {
          slug: route.params.event_name as string,
          authorUsername: route.params.username as string,
        },
      }).executeQuery()

      if (
        eventIsExisting.error ||
        eventIsExisting.data.value?.eventIsExisting
      ) {
        return abortNavigation() // TODO: { statusCode: 403 }
      }
    },
  ],
})

export default defineComponent({
  name: 'IndexPage',
  components: {
    QrCodeStream: () => {
      if (process.server) return
      return import('vue-qrcode-reader/src/components/QrcodeStream.vue')
    },
  },
  setup() {
    const router = useRouter()
    const { t } = useI18n()
    const store = useMaevsiStore()
    const route = useRoute()

    const eventQuery = useEventByAuthorUsernameAndSlugQuery({
      variables: {
        authorUsername: route.params.username as string,
        slug: route.params.event_name as string,
      },
    })
    const apiData = {
      api: computed(() => {
        return {
          data: {
            ...eventQuery.data.value,
          },
          ...getApiMeta([eventQuery]),
        }
      }),
      event: computed(
        () => eventQuery.data.value?.eventByAuthorUsernameAndSlug
      ),
    }
    const data = reactive({
      invitationCode: undefined as string | undefined,
      isNfcWritableErrorMessage: undefined as string | undefined,
      loading: false,
      routeParamEventName: route.params.event_name as string,
      routeParamUsername: route.params.username as string,
      title: t('title'),
    })
    const computations = {
      isNfcError: computed(() => {
        return !!(
          data.isNfcWritableErrorMessage &&
          data.isNfcWritableErrorMessage !== 'prompt'
        )
      }),
      title: computed(() => {
        if (
          route.params.username === store.signedInUsername &&
          apiData.event.value
        ) {
          return `${t('title')} · ${apiData.event.value.name}`
        }
        return '403'
      }),
    }
    const methods = {
      qrCodeScan() {
        store.modalAdd({ id: 'ModalAttendanceScanQrCode' })
      },
      async onInit(promise: Promise<any>) {
        data.loading = true

        try {
          await promise
        } catch (error: any) {
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

          Swal.fire({
            icon: 'error',
            text: errorMessage,
            title: t('globalStatusError'),
          }).then(() => store.modalRemove('ModalAttendanceScanQrCode'))
          consola.error(errorMessage)
        } finally {
          data.loading = false
        }
      },
      async onClick() {
        await methods.writeTag(data.invitationCode)
      },
      onDecode(e: any): void {
        data.invitationCode = e
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        }).then(() => store.modalRemove('ModalAttendanceScanQrCode'))
      },
      t,
      async checkWriteTag(): Promise<void> {
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
      },
      async writeTag(e: any): Promise<void> {
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
      },
    }

    onMounted(() => {
      methods.checkWriteTag().catch((err: Error) => {
        data.isNfcWritableErrorMessage = err.message
      })
    })

    watch(eventQuery.error, (currentValue, _oldValue) => {
      if (currentValue) consola.error(currentValue)
    })

    useHead({
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: data.title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            router.currentRoute.value.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: data.title,
        },
      ],
      title: data.title,
    })

    return {
      ...apiData,
      ...data,
      ...methods,
      ...computations,
    }
  },
})
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
  errorCameraNotAllowed: Camera access permisson is missing.
  errorCameraNotFound: Could not find a suitable camera.
  errorCameraNotReadable: Could not access camera. Is it used by another program?
  errorCameraNotSupported: The web page is not loaded over a secure connection.
  errorCameraOverconstrained: Front camera access is not possible.
  errorCameraStreamApiNotSupported: The browser does not support access to video streams.
  errorNavigatorPermissionsNotSupported: Navigator permissions are not supported! {hintUpdateOrChrome}
  errorNfcAbort: The NFC scan was interrupted! {hintTryAgain}
  errorNfcNetwork: The NFC transmission was interrupted! {hintTryAgain}
  errorNfcNotAllowed: NFC access permission is missing! {hintBrowserSettings}
  errorNfcNotReadable: Could not access NFC adapter. Is it used by another program?
  errorNfcNotSupported: No compatible NFC adapter was found. {hintUpdateOrChrome}
  events: events
  hintBrowserSettings: Check your browser settings.
  hintUpdateOrChrome: Try to update your browser or to use Google Chrome.
  hintTryAgain: Try again.
  nfcWrite: Write NFC tag
  qrCodeScan: Scan check in code
  qrHint: Have guests show you the QR code on their invitation page
  scanned: 'Scanned: {scanResult}'
  title: Check in
</i18n>
