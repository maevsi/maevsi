<script setup lang="ts">
import { Column, Img, Row, Section } from '@vue-email/components'

import type { Locale } from '../../../utils/i18n'
import AppText from './base/AppText.vue'
import { LOGO_CID } from '../../../utils/assets'

export interface Props {
  logoSource?: string
  locale: Locale
}
const props = withDefaults(defineProps<Props>(), {
  logoSource: undefined,
})

const { siteUrl } = useSiteUrl()

// data
const locales = {
  de: {
    logo: (siteName: string) => `${siteName}s Logo`,
    siteName: 'Vibetype',
    subtitle: 'Finde Veranstaltungen, Gäste und Freunde 💙❤️💚',
  },
  en: {
    logo: (siteName: string) => `${siteName}'s logo`,
    siteName: 'Vibetype',
    subtitle: 'Find events, guests and friends 💙❤️💚',
  },
}
const t = locales[props.locale]
</script>

<template>
  <Section padding-top="30px">
    <Row>
      <Column>
        <Img
          :alt="t.logo(t.siteName)"
          height="100"
          :href="siteUrl"
          :src="logoSource || `cid:${LOGO_CID}`"
          style="margin: auto"
          width="300"
        />
      </Column>
    </Row>
  </Section>
  <Section>
    <Row width="100%">
      <Column>
        <AppText style="font-size: 14px; margin: 0; text-align: center">
          {{ t.subtitle }}
        </AppText>
      </Column>
    </Row>
  </Section>
</template>
