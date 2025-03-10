<script setup lang="ts">
import { Column, Row, Section, Link, Img } from '@vue-email/components'

import type { Locale } from '../../utils/i18n'
import AppButton from './components/base/AppButton.vue'
import AppText from './components/base/AppText.vue'
import AppFooter from './components/AppFooter.vue'
import Email from './Email.vue'

export interface Props {
  emailAddress: string
  eventAttendanceType: string
  eventAuthorProfileHref: string
  eventAuthorProfilePictureSrc: string
  eventAuthorUsername: string
  eventLink: string
  eventName: string
  eventDescription?: string
  eventDuration?: string
  eventStart: string
  eventVisibility: string
  locale: Locale
  logoSource?: string
}
const props = withDefaults(defineProps<Props>(), {
  eventDescription: undefined,
  eventDuration: undefined,
  logoSource: undefined,
})

const locales = {
  de: {
    button: 'Zu- oder absagen',
    createdBy: 'Erstellt von',
    eventAttendanceType: (eventAttendanceType: string) =>
      `Teilnahme: ${eventAttendanceType}`,
    eventDescriptionTitle: 'Details',
    eventDuration: (eventDuration: string) => `Dauer: ${eventDuration}`,
    eventShow: 'Veranstaltung anzeigen',
    eventStart: (eventStart: string) => `Beginn: ${eventStart} UTC`,
    eventVisibility: (eventVisibility: string) =>
      `Dies ist eine ${eventVisibility} Veranstaltung.`,
    header: (eventAuthorUsername: string) =>
      `${eventAuthorUsername} hat dich eingeladen!`,
    profilePicture: 'Profilbild',
    title: (eventName: string) => `Einladung: ${eventName}`,
  },
  en: {
    button: 'Accept or decline',
    createdBy: 'Created by',
    eventAttendanceType: (eventAttendanceType: string) =>
      `Attendance: ${eventAttendanceType}`,
    eventDescriptionTitle: 'Details',
    eventDuration: (eventDuration: string) => `Duration: ${eventDuration}`,
    eventShow: 'Show event',
    eventStart: (eventStart: string) => `Start: ${eventStart} UTC`,
    eventVisibility: (eventVisibility: string) =>
      `This is ${eventVisibility} event.`,
    header: (eventAuthorUsername: string) =>
      `${eventAuthorUsername} invited you!`,
    profilePicture: 'Profile picture',
    title: (eventName: string) => `Invitation: ${eventName}`,
  },
}
const t = locales[props.locale]
</script>

<template>
  <Email :locale="locale" :logo-source="logoSource" :title="t.title(eventName)">
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
            {{ t.header(eventAuthorUsername) }}
          </AppText>
        </Column>
      </Row>
    </Section>
    <Section>
      <Row>
        <Column>
          <AppText
            style="
              line-height: 30px;
              padding-bottom: 0;
              font-size: 24px;
              font-weight: 700;
            "
          >
            {{ eventName }}
          </AppText>
          <AppText>
            {{ t.eventStart(eventStart) }}
            <template v-if="eventDuration">
              <br />
              {{ t.eventDuration(eventDuration) }}
            </template>
            <template v-if="eventAttendanceType">
              <br />
              {{ t.eventAttendanceType(eventAttendanceType) }}
            </template>
            <br />
            {{ t.eventVisibility(eventVisibility) }}
          </AppText>
          <AppText
            style="
              margin: 0;
              margin-top: 32px;
              margin-bottom: 32px;
              text-align: center;
            "
          >
            <AppButton :href="eventLink">
              {{ t.button }}
            </AppButton>
          </AppText>
          <template v-if="eventDescription">
            <AppText font-weight="700">
              {{ t.eventDescriptionTitle }}
            </AppText>
            <AppText>
              {{ eventDescription }}
              <br />
              <Link :href="eventLink" style="text-decoration: underline">
                {{ t.eventShow }}
              </Link>
            </AppText>
          </template>
        </Column>
      </Row>
    </Section>
    <Section style="padding-top: 20px">
      <Row>
        <Column width="12%">
          <Img
            :alt="t.profilePicture"
            height="50"
            :href="eventAuthorProfileHref"
            :src="eventAuthorProfilePictureSrc"
            width="50"
          />
        </Column>
        <Column width="88%">
          <AppText style="font-style: italic; line-height: 9px">
            {{ t.createdBy }}
          </AppText>
          <AppText style="line-height: 9px">
            {{ eventAuthorUsername }}
          </AppText>
        </Column>
      </Row>
    </Section>
    <AppFooter :email-address="emailAddress" :locale="locale" />
  </Email>
</template>
