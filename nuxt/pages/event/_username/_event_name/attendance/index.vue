<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="flex flex-col gap-4 justify-center">
      <ButtonColored
        :aria-label="$t('qrCodeScan')"
        :icon-id="['fas', 'qrcode']"
        class="text-text-bright"
        @click="qrCodeScan"
      >
        {{ $t('qrCodeScan') }}
      </ButtonColored>
      <span v-if="invitationCode" class="text-center">
        {{ $t('scanned', { scanResult: invitationCode }) }}
      </span>
      <div v-if="invitationCode" class="flex flex-col items-center">
        <ButtonColored
          :aria-label="$t('nfcWrite')"
          :disabled="
            isNfcWritableErrorMessage && isNfcWritableErrorMessage !== 'prompt'
          "
          :icon-id="['fas', 'user-tag']"
          class="text-text-bright"
          @click="onClick"
        >
          {{ $t('nfcWrite') }}
        </ButtonColored>
        <span
          v-if="
            isNfcWritableErrorMessage && isNfcWritableErrorMessage !== 'prompt'
          "
          class="text-gray-500"
        >
          {{ isNfcWritableErrorMessage }}
        </span>
      </div>
    </div>
    <Modal
      id="ModalAttendanceScanQrCode"
      :submit-icon-id="['fas', 'times-circle']"
      :submit-name="$t('close')"
    >
      <QrCodeStream @decode="onDecode" @init="onInit">
        <div v-if="loading" class="text-center">
          {{ $t('globalLoading') }}
        </div>
      </QrCodeStream>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import consola from 'consola'

import EVENT_BY_ORGANIZER_USERNAME_AND_SLUG from '~/gql/query/event/eventByAuthorUsernameAndSlug.gql'
import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'
import { Event as MaevsiEvent } from '~/types/event'

import { defineComponent } from '#app'

export default defineComponent({
  name: 'IndexPage',
  components: {
    QrCodeStream: async () => {
      if (process.server) return
      const { QrcodeStream } = await import('vue-qrcode-reader')
      return QrcodeStream
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
    })

    return eventIsExisting
  },
  data() {
    return {
      event: undefined as MaevsiEvent | undefined,
      graphqlError: undefined as any,
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
    ;(this.checkWriteTag as Function)().catch((err: Error) => {
      this.isNfcWritableErrorMessage = `Error: ${err.message}`
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
          errorMessage = this.$t('errorCameraNotAllowed') as string
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
      await (this.writeTag as Function)(this.invitationCode)
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
        return Promise.reject(Error('Web NFC is not supported!'))
      }

      if (!navigator.permissions) {
        return Promise.reject(Error('Navigator permissions are not supported!'))
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
            errorMessage = this.$t('errorNfcAbort') as string
          } else if (error.name === 'NotAllowedError') {
            errorMessage = this.$t('errorNfcNotAllowed') as string
          } else if (error.name === 'NotSupportedError') {
            errorMessage = this.$t('errorNfcNotSupported') as string
          } else if (error.name === 'NotReadableError') {
            errorMessage = this.$t('errorNfcNotReadable') as string
          } else if (error.name === 'NetworkError') {
            errorMessage = this.$t('errorNfcNetwork') as string
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
  errorCameraNotAllowed: Berechtigung zum Kamerazugriff fehlt.
  errorCameraNotFound: Konnte keine geeignete Kamera finden.
  errorCameraNotReadable: Zugriff auf die Kamera nicht möglich. Wird sie von einem anderen Programm verwendet?
  errorCameraNotSupported: Die Webseite wird nicht über eine sichere Verbindung geladen.
  errorCameraOverconstrained: Frontkamerazugriff ist nicht möglich.
  errorCameraStreamApiNotSupported: Der Browser unterstützt den Zugriff auf Videostreams nicht.
  errorNfcAbort: Der NFC-Scan wurde unterbrochen.
  errorNfcNetwork: Die NFC-Übertragung wurde unterbrochen.
  errorNfcNotAllowed: Berechtigung zum NFC-Zugriff fehlt.
  errorNfcNotReadable: Zugriff auf den NFC-Adapter nicht möglich. Wird er von einem anderen Programm verwendet?
  errorNfcNotSupported: Es wurde kein kompatibler NFC-Adapter gefunden.
  nfcWrite: NFC-Tag schreiben
  qrCodeScan: QR-Code scannen
  scanned: 'Gescannt: {scanResult}'
  title: Anwesenheiten
en:
  close: Close
  errorCameraNotAllowed: Camera access permisson is missing.
  errorCameraNotFound: Could not find a suitable camera.
  errorCameraNotReadable: Could not access camera. Is it used by another program?
  errorCameraNotSupported: The web page is not loaded over a secure connection.
  errorCameraOverconstrained: Front camera access is not possible.
  errorCameraStreamApiNotSupported: The browser does not support access to video streams.
  errorNfcAbort: The NFC scan was interrupted.
  errorNfcNetwork: The NFC transmission was interrupted.
  errorNfcNotAllowed: NFC access permission is missing.
  errorNfcNotReadable: Could not access NFC adapter. Is it used by another program?
  errorNfcNotSupported: No compatible NFC adapter was found.
  nfcWrite: Write NFC tag
  qrCodeScan: Scan QR-Code
  scanned: 'Scanned: {scanResult}'
  title: Attendances
</i18n>
