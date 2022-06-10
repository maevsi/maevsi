<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="flex flex-col items-center justify-center gap-4">
      <ButtonColored
        :aria-label="$t('qrCodeScan')"
        class="text-text-bright"
        @click="qrCodeScan"
      >
        {{ $t('qrCodeScan') }}
        <template slot="prefix">
          <IconQrCode />
        </template>
      </ButtonColored>
      <FormInputStateInfo v-if="!invitationCode">
        {{ $t('qrHint') }}
      </FormInputStateInfo>
      <CardStateInfo v-if="invitationCode">
        {{ $t('scanned', { scanResult: invitationCode }) }}
      </CardStateInfo>
      <div v-if="invitationCode" class="flex flex-col items-center">
        <ButtonColored
          :aria-label="$t('nfcWrite')"
          :disabled="isNfcError"
          class="text-text-bright"
          @click="onClick"
        >
          {{ $t('nfcWrite') }}
          <template slot="prefix">
            <IconUserTag />
          </template>
        </ButtonColored>
        <CardStateAlert v-if="isNfcError">
          {{ isNfcWritableErrorMessage }}
        </CardStateAlert>
      </div>
    </div>
    <Modal id="ModalAttendanceScanQrCode" :submit-name="$t('close')">
      <QrCodeStream @decode="onDecode" @init="onInit">
        <div v-if="loading" class="text-center">
          {{ $t('globalLoading') }}
        </div>
      </QrCodeStream>
      <template slot="submit-icon">
        <IconXCircle />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'
import consola from 'consola'

import { defineComponent } from '#app'
import EVENT_BY_ORGANIZER_USERNAME_AND_SLUG from '~/gql/query/event/eventByAuthorUsernameAndSlug.gql'
import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'
import { Event as MaevsiEvent } from '~/types/event'

export default defineComponent({
  name: 'IndexPage',
  components: {
    QrCodeStream: () => {
      if (process.server) return
      return import('vue-qrcode-reader/src/components/QrcodeStream.vue')
    },
  },
  apollo: {
    event(): any {
      return {
        query: EVENT_BY_ORGANIZER_USERNAME_AND_SLUG,
        variables: {
          authorUsername: this.$route.params.username,
          slug: this.$route.params.event_name,
        },
        update: (data: any) => data.eventByAuthorUsernameAndSlug,
        error(error: any, _vm: any, _key: any, _type: any, _options: any) {
          this.graphqlError = error
          consola.error(error)
        },
      }
    },
  },
  middleware({ error, res, params, store }: Context) {
    if (res && params.username !== store.getters.signedInUsername) {
      return error({ statusCode: 403 })
    }
  },
  async validate({ app, params }): Promise<boolean> {
    const {
      data: { eventIsExisting },
    } = await app.apolloProvider!.defaultClient.query({
      query: EVENT_IS_EXISTING_QUERY,
      variables: {
        slug: params.event_name,
        authorUsername: params.username,
      },
      fetchPolicy: 'network-only',
    })

    return eventIsExisting
  },
  transition: {
    name: 'layout',
  },
  data() {
    return {
      event: undefined as MaevsiEvent | undefined,
      graphqlError: undefined as Error | undefined,
      invitationCode: undefined as string | undefined,
      isNfcWritableErrorMessage: undefined as string | undefined,
      loading: false,
    }
  },
  head() {
    const title = this.title as string
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            this.$router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: title,
        },
      ],
      title,
    }
  },
  computed: {
    isNfcError(): boolean {
      return !!(
        this.isNfcWritableErrorMessage &&
        this.isNfcWritableErrorMessage !== 'prompt'
      )
    },
    title(): string | undefined {
      if (
        this.$route.params.username === this.$store.getters.signedInUsername
      ) {
        return `${this.$t('title')} · ${this.$util.getNested(
          this.event,
          'name'
        )}`
      }
      return '403'
    },
  },
  mounted() {
    this.checkWriteTag().catch((err: Error) => {
      this.isNfcWritableErrorMessage = err.message
    })
  },
  methods: {
    qrCodeScan() {
      this.$store.commit('modalAdd', { id: 'ModalAttendanceScanQrCode' })
    },
    async onInit(promise: Promise<any>) {
      this.loading = true

      try {
        await promise
      } catch (error: any) {
        let errorMessage: string = error.message

        if (error.name === 'NotAllowedError') {
          errorMessage = this.$t('errorCameraNotAllowed', {
            hintBrowserSettings: this.$t('hintBrowserSettings'),
          }) as string
        } else if (error.name === 'NotFoundError') {
          errorMessage = this.$t('errorCameraNotFound') as string
        } else if (error.name === 'NotSupportedError') {
          errorMessage = this.$t('errorCameraNotSupported') as string
        } else if (error.name === 'NotReadableError') {
          errorMessage = this.$t('errorCameraNotReadable') as string
        } else if (error.name === 'OverconstrainedError') {
          errorMessage = this.$t('errorCameraOverconstrained') as string
        } else if (error.name === 'StreamApiNotSupportedError') {
          errorMessage = this.$t('errorCameraStreamApiNotSupported') as string
        }

        this.$swal({
          icon: 'error',
          text: errorMessage,
          title: this.$t('globalStatusError'),
        }).then(() =>
          this.$store.commit('modalRemove', 'ModalAttendanceScanQrCode')
        )
        consola.error(errorMessage)
      } finally {
        this.loading = false
      }
    },
    async onClick() {
      await this.writeTag(this.invitationCode)
    },
    onDecode(e: any): void {
      this.invitationCode = e
      this.$swal({
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() =>
        this.$store.commit('modalRemove', 'ModalAttendanceScanQrCode')
      )
    },
    async checkWriteTag(): Promise<void> {
      if (!('NDEFReader' in window)) {
        return Promise.reject(
          Error(
            this.$t('errorNfcNotSupported', {
              hintUpdateOrChrome: this.$t('hintUpdateOrChrome'),
            }) as string
          )
        )
      }

      if (!navigator.permissions) {
        return Promise.reject(
          Error(
            this.$t('errorNavigatorPermissionsNotSupported', {
              hintUpdateOrChrome: this.$t('hintUpdateOrChrome'),
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
        this.$swal({
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
      } catch (error) {
        if (error instanceof DOMException) {
          let errorMessage: string = error.message

          if (error.name === 'AbortError') {
            errorMessage = this.$t('errorNfcAbort', {
              hintTryAgain: this.$t('hintTryAgain'),
            }) as string
          } else if (error.name === 'NotAllowedError') {
            errorMessage = this.$t('errorNfcNotAllowed', {
              hintBrowserSettings: this.$t('hintBrowserSettings'),
            }) as string
          } else if (error.name === 'NotSupportedError') {
            errorMessage = this.$t('errorNfcNotSupported') as string
          } else if (error.name === 'NotReadableError') {
            errorMessage = this.$t('errorNfcNotReadable') as string
          } else if (error.name === 'NetworkError') {
            errorMessage = this.$t('errorNfcNetwork', {
              hintTryAgain: this.$t('hintTryAgain'),
            }) as string
          }

          this.$swal({
            icon: 'error',
            text: errorMessage,
            title: this.$t('globalStatusError'),
          })
          consola.error(errorMessage)
        } else {
          alert(`Unexpected error: ${error}`)
        }
      }
    },
  },
})
</script>

<i18n lang="yml">
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
  title: Check-ins
en:
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
  hintBrowserSettings: Check your browser settings.
  hintUpdateOrChrome: Try to update your browser or to use Google Chrome.
  hintTryAgain: Try again.
  nfcWrite: Write NFC tag
  qrCodeScan: Scan check in code
  qrHint: Have guests show you the QR code on their invitation page
  scanned: 'Scanned: {scanResult}'
  title: Check ins
</i18n>
