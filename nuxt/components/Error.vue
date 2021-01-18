<template>
  <div>
    <p class="font-black font-family-montserrat text-center text-xl">
      maev.no? 🥺
    </p>
    <h1>{{ statusCode }} - {{ statusReason }}</h1>
    <div class="flex flex-wrap justify-center">
      <ButtonHome />
      <Spacer />
      <ButtonSignIn v-if="statusCode === 403" />
    </div>
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
  'error': 'Fehler'
en:
  'error': 'Error'
</i18n>
