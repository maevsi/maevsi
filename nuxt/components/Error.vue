<template>
  <div>
    <span class="font-black font-family-montserrat text-xl">maev.no?</span>
    <h1>{{ statusCode }} - {{ statusReason }}</h1>
    <div class="flex flex-wrap justify-center my-2">
      <ButtonHome class="m-2" />
    </div>
  </div>
</template>

<script>
import status from '@http-util/status-i18n'

export default {
  props: {
    statusCode: {
      type: Number,
      default: undefined,
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
