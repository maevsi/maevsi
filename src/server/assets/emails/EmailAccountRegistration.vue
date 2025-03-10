<script setup lang="ts">
import { Column, Row, Section } from '@vue-email/components'

import type { Locale } from '../../utils/i18n'
import AppButton from './components/base/AppButton.vue'
import AppText from './components/base/AppText.vue'
import AppAuthor from './components/AppAuthor.vue'
import AppFooter from './components/AppFooter.vue'
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
    paragraph1: (siteName: string) =>
      `Vielen Dank für deine Anmeldung bei ${siteName} - wir freuen uns, dass du dabei bist!`,
    paragraph2:
      'Bitte klicke auf den unten stehenden Button, um die Registrierung abzuschließen und dein Profil einzurichten.',
    siteName: 'Vibetype',
    title: 'Willkommen',
    validUntil: (validUntil: string) =>
      `Diese Anfrage ist bis zum ${validUntil} UTC gültig.`,
  },
  en: {
    button: 'Complete registration',
    header: (username: string) => `Welcome, ${username}!`,
    paragraph1: (siteName: string) =>
      `Thanks so much for joining ${siteName} — we're thrilled to have you!`,
    paragraph2:
      'Please click on the button below to complete your registration and set up your profile.',
    siteName: 'Vibetype',
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
          <AppText
            style="
              font-weight: 700;
              line-height: 54px;
              font-size: 36px;
              text-align: center;
            "
          >
            {{ t.header(username) }}
          </AppText>
        </Column>
      </Row>
    </Section>
    <Section>
      <Row>
        <Column>
          <AppText>
            {{ t.paragraph1(t.siteName) }}
          </AppText>
          <AppText>
            {{ t.paragraph2 }}
          </AppText>
          <AppText style="margin: 0; margin-top: 32px; text-align: center">
            <AppButton :href="emailAddressVerificationLink">
              {{ t.button }}
            </AppButton>
          </AppText>
          <AppText
            style="
              color: #555;
              font-size: 13px;
              margin-top: 8px;
              text-align: center;
            "
          >
            {{ t.validUntil(validUntil) }}
          </AppText>
        </Column>
      </Row>
    </Section>
    <AppAuthor :locale="locale" />
    <AppFooter :email-address="emailAddress" :locale="locale" />
  </Email>
</template>
