<script setup lang="ts">
import { Column, Row, Section } from '@vue-email/components'

import type { Locale } from '../../utils/i18n'
import MaevsiButton from './components/base/MaevsiButton.vue'
import MaevsiText from './components/base/MaevsiText.vue'
import MaevsiAuthor from './components/MaevsiAuthor.vue'
import MaevsiFooter from './components/MaevsiFooter.vue'
import Email from './Email.vue'

export interface Props {
  emailAddress: string
  emailAddressVerificationLink: string
  locale: Locale
  logoSource?: string
  username: string
  validUntil: string
}
const props = withDefaults(defineProps<Props>(), {
  logoSource: undefined,
})

const locales = {
  de: {
    button: 'Registrierung abschließen',
    header: (username: string) => `Willkommen, ${username}!`,
    paragraph1:
      'Vielen Dank für deine Anmeldung bei maevsi - wir freuen uns, dass du dabei bist!',
    paragraph2:
      'Bitte klicke auf den unten stehenden Button, um die Registrierung abzuschließen und dein Profil einzurichten.',
    title: 'Willkommen',
    validUntil: (validUntil: string) =>
      `Diese Anfrage ist bis zum ${validUntil} UTC gültig.`,
  },
  en: {
    button: 'Complete registration',
    header: (username: string) => `Welcome, ${username}!`,
    paragraph1:
      "Thanks so much for joining maevsi — we're thrilled to have you!",
    paragraph2:
      'Please click on the button below to complete your registration and set up your profile.',
    title: 'Welcome',
    validUntil: (validUntil: string) =>
      `This request is valid until ${validUntil} UTC.`,
  },
}
const t = locales[props.locale]
</script>

<template>
  <Email :locale="locale" :logo-source="logoSource" :title="t.title">
    <Section style="padding-top: 30px">
      <Row style="width: 45%">
        <Column>
          <MaevsiText
            style="
              font-weight: 700;
              line-height: 54px;
              font-size: 36px;
              text-align: center;
            "
          >
            {{ t.header(username) }}
          </MaevsiText>
        </Column>
      </Row>
    </Section>
    <Section>
      <Row>
        <Column>
          <MaevsiText>
            {{ t.paragraph1 }}
          </MaevsiText>
          <MaevsiText>
            {{ t.paragraph2 }}
          </MaevsiText>
          <MaevsiText style="margin: 0; margin-top: 32px; text-align: center">
            <MaevsiButton :href="emailAddressVerificationLink">
              {{ t.button }}
            </MaevsiButton>
          </MaevsiText>
          <MaevsiText
            style="
              color: #555;
              font-size: 13px;
              margin-top: 8px;
              text-align: center;
            "
          >
            {{ t.validUntil(validUntil) }}
          </MaevsiText>
        </Column>
      </Row>
    </Section>
    <MaevsiAuthor :locale="locale" />
    <MaevsiFooter :email-address="emailAddress" :locale="locale" />
  </Email>
</template>
