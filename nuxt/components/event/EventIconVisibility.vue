<template>
  <EventIcon>
    <FontAwesomeIcon
      v-if="event.archived"
      :icon="['fas', 'archive']"
      :title="$t('archived')"
    />
    <FontAwesomeIcon
      v-else-if="event.visibility === 'PUBLIC'"
      :icon="['fas', 'globe-africa']"
      :title="$t('public')"
    />
    <FontAwesomeIcon
      v-else-if="event.visibility === 'PRIVATE'"
      :icon="['fas', 'key']"
      :title="$t('private')"
    />
    <FontAwesomeIcon v-else :icon="['fas', 'bug']" :title="$t('bug')" />
  </EventIcon>
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
