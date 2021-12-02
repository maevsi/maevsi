<template>
  <div>
    <h1>{{ title }}</h1>
    <span>{{ invitationCode }}</span>
    <div class="flex flex-col gap-4 justify-center">
      <ButtonColored
        :aria-label="$t('qrCodeScan')"
        :icon-id="['fas', 'qrcode']"
        class="text-text-bright"
        @click="qrCodeScan"
      >
        {{ $t('qrCodeScan') }}
      </ButtonColored>
      <ButtonColored
        v-if="invitationCode"
        :aria-label="$t('nfcWrite')"
        :icon-id="['fas', 'user-tag']"
        class="text-text-bright"
        @click="onClick"
      >
        {{ $t('nfcWrite') }}
      </ButtonColored>
    </div>
    <Modal id="ModalAttendanceScanQrCode">
      <QrCodeStream @decode="onDecode" @init="onInit">
        <div v-if="loading" class="text-center">
          {{ $t('globalLoading') }}
        </div>
      </QrCodeStream>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import consola from 'consola'

import EVENT_BY_ORGANIZER_USERNAME_AND_SLUG from '~/gql/query/event/eventByAuthorUsernameAndSlug.gql'
import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'
import { Event as MaevsiEvent } from '~/types/event'

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
      invitationCode: undefined as String | undefined,
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
        return `${this.$t('title')} · ${this.$global.getNested(
          this.event,
          'name'
        )}`
      }
      return '403'
    },
  },
  methods: {
    qrCodeScan() {
      this.$store.commit('modalAdd', { id: 'ModalAttendanceScanQrCode' })
    },
    async onInit(promise: Promise<any>) {
      this.loading = true

      try {
        await promise
      } catch (error) {
        consola.error(error)
        // if (error.name === 'NotAllowedError') {
        //   // user denied camera access permisson
        // } else if (error.name === 'NotFoundError') {
        //   // no suitable camera device installed
        // } else if (error.name === 'NotSupportedError') {
        //   // page is not served over HTTPS (or localhost)
        // } else if (error.name === 'NotReadableError') {
        //   // maybe camera is already in use
        // } else if (error.name === 'OverconstrainedError') {
        //   // did you requested the front camera although there is none?
        // } else if (error.name === 'StreamApiNotSupportedError') {
        //   // browser seems to be lacking features
        // }
      } finally {
        this.loading = false
      }
    },
    async onClick() {
      if (await (this.checkWriteTag as Function)()) {
        await (this.writeTag as Function)(this.invitationCode)
      }
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
    // async readTag() {
    //   if ('NDEFReader' in window) {
    //     const ndef = new NDEFReader()
    //     try {
    //       await ndef.scan()
    //       ndef.onreading = (event: any) => {
    //         const decoder = new TextDecoder()
    //         for (const record of event.message.records) {
    //           this.consoleLog('Record type:  ' + record.recordType)
    //           this.consoleLog('MIME type:    ' + record.mediaType)
    //           this.consoleLog('=== data ===\n' + decoder.decode(record.data))
    //         }
    //       }
    //     } catch (error) {
    //       this.consoleLog(error)
    //     }
    //   } else {
    //     this.consoleLog('Web NFC is not supported.')
    //   }
    // },
    async checkWriteTag(): Promise<Boolean> {
      if (!('NDEFReader' in window)) {
        alert('Web NFC is not supported!')
        return Promise.resolve(false)
      }

      if (!navigator.permissions) {
        alert('Navigator permissions are not supported!')
        return Promise.resolve(false)
      } else {
        const nfcPermissionStatus = await navigator.permissions.query({
          name: 'nfc' as PermissionName,
        })

        if (nfcPermissionStatus.state === 'granted') {
          return Promise.resolve(true)
        } else {
          alert(nfcPermissionStatus.state)
          return Promise.resolve(false)
        }
      }
    },
    async writeTag(e: any): Promise<void> {
      try {
        await new NDEFReader().write(e)
        alert('NDEF message written!')
      } catch (error) {
        alert(error)
      }
    },
  },
})
</script>

<i18n lang="yml">
de:
  nfcWrite: NFC schreiben
  qrCodeScan: QR-Code scannen
  title: Anwesenheiten
en:
  nfcWrite: Write NFC
  qrCodeScan: Scan QR-Code
  title: Attendances
</i18n>
