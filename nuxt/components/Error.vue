<template>
  <div>
    <!-- eslint-disable vue/no-v-html -->
    <p
      class="font-black text-center text-xl"
      v-html="twemoji.parse($t('maevNo'), { className: 'h-5 inline-block' })"
    />
    <!--eslint-enable-->
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

<script lang="ts">
import status from '@http-util/status-i18n'
import twemoji from 'twemoji'

import { defineComponent } from '#app'

export default defineComponent({
  name: 'MaevsiError',
  props: {
    statusCode: {
      default: undefined,
      type: Number as PropType<number | undefined>,
    },
  },
  data() {
    return {
      twemoji,
    }
  },
  computed: {
    statusReason(): string {
      // TODO: https://github.com/http-util/status-i18n/issues/27
      let statusCodeLanguageCode

      switch (this.$i18n.locale) {
        case 'de': // Prepared for https://github.com/http-util/status-i18n/pull/26
          statusCodeLanguageCode = 'de-de'
          break
        // en captured by `default`
        default:
          statusCodeLanguageCode = 'en-us'
          break
      }
      return (
        status(this.statusCode, statusCodeLanguageCode) ||
        (this.$t('error') as string)
      )
    },
  },
})
</script>

<i18n lang="yml">
de:
  403description: Du bist aktuell nicht berechtigt, auf diese Seite zuzugreifen.
  403hint: Hast du dich schon angemeldet oder von diesem Gerät aus einen Einladungscode eingegeben?
  error: Fehler
  maevNo: maev.no? 🥺
en:
  403description: "You're currently missing permissions to view this site."
  403hint: Did you already sign in or enter an invitation code on this device?
  error: Error
  maevNo: maev.no? 🥺
</i18n>
