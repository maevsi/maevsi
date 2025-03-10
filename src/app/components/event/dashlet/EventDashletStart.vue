<template>
  <EventDashlet v-if="event.start">
    <IHeroiconsCalendar :title="t('start')" />
    <div class="flex flex-col">
      <Button
        :aria-label="t('iCalDownload')"
        is-link-colored
        @click="downloadIcal"
      >
        {{ eventStart.format('lll') }}
      </Button>
      <span>
        {{ t('fromNow', { content: eventStart.fromNow() }) }}
      </span>
    </div>
  </EventDashlet>
</template>

<script setup lang="ts">
import downloadJs from 'downloadjs'
import type { RouteNamedMap } from 'vue-router/auto-routes'

import type {
  ContactItemFragment,
  EventItemFragment,
  GuestItemFragment,
} from '~~/gql/generated/graphql'

export interface Props {
  contact?: ContactItemFragment
  event: EventItemFragment
  invitation?: GuestItemFragment
}
const props = withDefaults(defineProps<Props>(), {
  contact: undefined,
  invitation: undefined,
})

const ROUTE_NAME: keyof RouteNamedMap = 'event-view-username-event_name___en'

const { t } = useI18n()
const dateTime = useDateTime()
const route = useRoute(ROUTE_NAME)
const fireAlert = useFireAlert()

// methods
const downloadIcal = async () => {
  const response = await useFetch<string>('/api/ical', {
    body: {
      contact: props.contact,
      event: props.event,
      invitation: props.invitation,
    },
    method: 'POST',
  })
  const fileName =
    route.params.username + '_' + route.params.event_name + '.ics'

  if (!response.data.value) {
    return await fireAlert({
      level: 'error',
      text: t('iCalFetchError'),
    }) // TODO: add suggestion (https://github.com/maevsi/vibetype/issues/903) })
  }

  downloadJs(
    new Blob([response.data.value]), // Blob necessary for charset utf-8
    fileName,
    'text/calendar',
  )
}

// computations
const eventStart = computed(() => dateTime(props.event.start))
</script>

<i18n lang="yaml">
de:
  fromNow: ({content})
  iCalDownload: Als Kalendereintrag herunterladen
  # iCalHint: Die heruntergeladene Datei kann dann mit deiner Kalender-Anwendung geöffnet werden.
  iCalFetchError: iCal-Daten konnten nicht geladen werden!
  start: Beginn
en:
  fromNow: ({content})
  iCalDownload: Download for your calendar
  # iCalHint: You can open the downloaded file in your calendar app.
  iCalFetchError: Could not get iCal data!
  start: start
</i18n>
