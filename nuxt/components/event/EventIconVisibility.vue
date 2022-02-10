<template>
  <IconArchive v-if="event && event.isArchived" :title="$t('archived')" />
  <IconGlobe
    v-else-if="event && event.visibility === 'PUBLIC'"
    :title="$t('public')"
  />
  <IconKey
    v-else-if="event && event.visibility === 'PRIVATE'"
    :title="$t('private')"
  />
  <IconBug v-else :title="$t('bug')" />
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'
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
