<script setup lang="ts">
import { Column, Img, Row, Section } from '@vue-email/components'

import type { Locale } from '../../../utils/i18n'
import MaevsiText from './base/MaevsiText.vue'
import { LOGO_CID } from '../../../utils/assets'

export interface Props {
  logoSource?: string
  locale: Locale
}
const props = withDefaults(defineProps<Props>(), {
  logoSource: undefined,
})

const siteUrl = useSiteUrl()

// data
const locales = {
  de: {
    logo: 'maevsis Logo',
    subtitle: 'Finde Veranstaltungen, Gäste und Freunde 💙❤️💚',
  },
  en: {
    logo: "maevsi's logo",
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
          :alt="t.logo"
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
        <MaevsiText style="font-size: 14px; margin: 0; text-align: center">
          {{ t.subtitle }}
        </MaevsiText>
      </Column>
    </Row>
  </Section>
</template>
