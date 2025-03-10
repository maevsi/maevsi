<script setup lang="ts">
import { Container, Font, Head, Html, Body } from '@vue-email/components'

import type { Locale } from '../../utils/i18n'
import AppLogo from './components/AppLogo.vue'

export interface Props {
  locale: Locale
  logoSource?: string
  title: string
}
withDefaults(defineProps<Props>(), {
  logoSource: undefined,
})
</script>

<script lang="ts">
export default {
  name: 'AppEmail',
}
</script>

<template>
  <Html :lang="locale">
    <Head>
      <!-- TODO: darkmode (https://www.litmus.com/blog/the-ultimate-guide-to-dark-mode-for-email-marketers) -->
      <title>
        {{ title }}
      </title>
      <!-- TODO: fix style inclusion for fonts -->
      <!-- TODO: update font to Raleway -->
      <Font
        font-family="Manrope"
        :fallback-font-family="['Helvetica', 'Arial', 'sans-serif']"
        :web-font="{
          url: 'https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSg.woff2',
          format: 'woff2',
        }"
      />
      <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
      <!-- <style>
        @font-face {
          font-family: Manrope;
          font-style: normal;
          font-weight: 400;
          mso-font-alt: Helvetica; /* stylelint-disable-line property-no-unknown */ /* stylelint-disable-line value-keyword-case */
          src: url('https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSg.woff2')
            format(woff2);
        }

        * {
          font-family: Manrope, Helvetica, Arial, sans-serif;
        }
      </style> -->
    </Head>
    <Body style="margin: 0">
      <Container
        style="background-color: #f0f0f0; max-width: 42.5em; padding: 0 2.5em"
      >
        <AppLogo :locale="locale" :logo-source="logoSource" />
        <slot />
      </Container>
    </Body>
  </Html>
</template>
