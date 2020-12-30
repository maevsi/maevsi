<template>
  <EventDashlet>
    <EventIconVisibility :event="event" />
    <span v-if="event.archived" class="block">{{ $t('archived') }}</span>
    <span v-else-if="event.visibility === 'PUBLIC'" class="block">
      {{ $t('public') }}
    </span>
    <span v-else-if="event.visibility === 'PRIVATE'" class="block">
      {{ $t('private') }}
    </span>
    <span v-else class="block">{{ $t('bug') }}</span>
  </EventDashlet>
</template>

<script>
export default {
  props: {
    event: {
      required: true,
      type: Object,
    },
  },
}
</script>

<i18n lang="yml">
de:
  archived: 'archiviert'
  bug: 'Bug'
  private: 'privat'
  public: 'öffentlich'
en:
  archived: 'archived'
  bug: 'bug'
  private: 'private'
  public: 'public'
</i18n>
