<template>
  <FontAwesomeIcon
    v-if="event.isArchived"
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
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Event } from '~/types/event'

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
