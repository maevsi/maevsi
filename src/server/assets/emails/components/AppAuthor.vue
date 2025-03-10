<script setup lang="ts">
import { Column, Img, Row, Section } from '@vue-email/components'

import type { Locale } from '../../../utils/i18n'
import { PROFILE_PICTURE_JONAS_CID } from '../../../utils/assets'
import AppText from './base/AppText.vue'

export interface Props {
  locale: Locale
}
const props = withDefaults(defineProps<Props>(), {})

// data
const authorName = 'Jonas Thelemann'
const authorWebsite = 'https://jonas-thelemann.de/'
const locales = {
  de: {
    author: (siteName: string) => `${siteName}s Autor`,
    profilePicture: 'Profilbild',
    siteName: 'Vibetype',
  },
  en: {
    author: (siteName: string) => `${siteName}'s author`,
    profilePicture: 'Profile picture',
    siteName: 'Vibetype',
  },
}
const t = locales[props.locale]
</script>

<template>
  <Section style="padding-top: 20px">
    <Row>
      <Column width="12%">
        <Img
          :alt="t.profilePicture"
          height="50"
          :href="authorWebsite"
          :src="`cid:${PROFILE_PICTURE_JONAS_CID}`"
          width="50"
        />
      </Column>
      <Column width="88%">
        <AppText style="line-height: 9px">
          {{ authorName }}
        </AppText>
        <AppText style="font-style: italic; line-height: 9px">
          {{ t.author(t.siteName) }}
        </AppText>
      </Column>
    </Row>
  </Section>
</template>
