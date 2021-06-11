<template>
  <div>
    <p class="font-black text-center text-xl">maev.no? 🥺</p>
    <h1>{{ statusCode ? `${statusCode} - ` : '' }}{{ statusReason }}</h1>
    <p v-if="statusCode === 403" class="text-center">
      {{ $t('403description') }}
      <br />
      {{ $t('403hint') }}
    </p>
    <ButtonList>
      <ButtonHome />
      <ButtonEventUnlock v-if="statusCode === 403" />
      <ButtonSignIn v-if="statusCode === 403" />
    </ButtonList>
  </div>
</template>

<script>
import status from '@http-util/status-i18n'

export default {
  props: {
    statusCode: {
      default: undefined,
      type: Number,
    },
  },
  computed: {
    statusReason() {
      // TODO: https://github.com/http-util/status-i18n/issues/27
      let statusCodeLanugageCode

      switch (this.$i18n.locale) {
        case 'de': // Prepared for https://github.com/http-util/status-i18n/pull/26
          statusCodeLanugageCode = 'de-de'
          break
        // en captured by `default`
        default:
          statusCodeLanugageCode = 'en-us'
          break
      }
      return status(this.statusCode, statusCodeLanugageCode) || this.$t('error')
    },
  },
}
</script>

<i18n lang="yml">
de:
  403description: Du bist aktuell nicht berechtigt, auf diese Seite zuzugreifen.
  403hint: Hast du von diesem Gerät aus schon einen Einladungscode eingegeben oder dich angemeldet?
  error: Fehler
en:
  403description: "You're currently missing permissions to view this site."
  403hint: On this device, did you already enter an invitation code or sign in?
  error: Error
</i18n>
