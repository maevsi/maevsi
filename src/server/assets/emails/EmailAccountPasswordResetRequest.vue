<script setup lang="ts">
import { Column, Row, Section, Link } from '@vue-email/components'

import type { Locale } from '../../utils/i18n'
import MaevsiButton from './components/base/MaevsiButton.vue'
import MaevsiText from './components/base/MaevsiText.vue'
import MaevsiAuthor from './components/MaevsiAuthor.vue'
import MaevsiFooter from './components/MaevsiFooter.vue'
import Email from './Email.vue'

export interface Props {
  emailAddress: string
  locale: Locale
  logoSource?: string
  passwordResetVerificationLink: string
  username: string
  validUntil: string
}
const props = withDefaults(defineProps<Props>(), {
  logoSource: undefined,
})

const locales = {
  de: {
    button: 'Passwort zurücksetzen',
    header: (username: string) => `Hey, ${username}!`,
    paragraph1:
      'Es wurde eine Anfrage zum Zurücksetzen des Kennworts für dein maevsi-Konto gestellt.',
    paragraph2:
      'Wenn du das warst, klicke auf den unten stehenden Button, um ein neues Passwort zu vergeben.',
    paragraph3:
      'Wenn du das nicht warst, kontaktiere uns bitte so schnell wie möglich unter der folgenden E-Mail-Adresse.',
    title: 'Passwort zurücksetzen',
    validUntil: (validUntil: string) =>
      `Diese Anfrage ist bis zum ${validUntil} UTC gültig.`,
  },
  en: {
    button: 'Reset password',
    header: (username: string) => `Hey, ${username}!`,
    paragraph1:
      'A request to reset the password for your maevsi account has been initiated.',
    paragraph2:
      'If that was you, click on the button below to set a new password.',
    paragraph3:
      "If that hasn't been you, please contact us as soon as possible using the email address below.",
    title: 'Reset password',
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
            <MaevsiButton :href="passwordResetVerificationLink">
              {{ t.button }}
            </MaevsiButton>
          </MaevsiText>
          <MaevsiText
            style="
              color: #555;
              font-size: 13px;
              margin-top: 8px;
              margin-bottom: 32px;
              text-align: center;
            "
          >
            {{ t.validUntil(validUntil) }}
          </MaevsiText>
          <MaevsiText>
            {{ t.paragraph3 }}
          </MaevsiText>
          <MaevsiText>
            <Link
              href="mailto:contact+password-reset@maev.si"
              style="text-decoration: underline"
            >
              <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
              {{ 'contact+password-reset@maev.si' }}
            </Link>
          </MaevsiText>
        </Column>
      </Row>
    </Section>
    <MaevsiAuthor :locale="locale" />
    <MaevsiFooter :email-address="emailAddress" :locale="locale" />
  </Email>
</template>
