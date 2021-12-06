<template>
  <EventDashlet v-if="event">
    <span>
      <EventIconVisibility :event="event" />
    </span>
    <span v-if="event.isArchived" class="block">{{ $t('archived') }}</span>
    <span v-else-if="event.visibility === 'PUBLIC'" class="block">
      {{ $t('public') }}
    </span>
    <span v-else-if="event.visibility === 'PRIVATE'" class="block">
      {{ $t('private') }}
    </span>
    <span v-else class="block">{{ $t('bug') }}</span>
  </EventDashlet>
</template>

<script lang="ts">
import { Event } from '~/types/event'

import { defineComponent, PropType } from '#app'

export default defineComponent({
  props: {
    event: {
      required: true,
      type: Object as PropType<Event>,
    },
  },
})
</script>

<i18n lang="yml">
de:
  archived: archiviert
  bug: Bug
  private: privat
  public: öffentlich
en:
  archived: archived
  bug: bug
  private: private
  public: public
</i18n>
