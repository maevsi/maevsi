<template>
  <EventDashlet v-if="event">
    <span>
      <EventIconVisibility
        :is-archived="event.isArchived"
        :visibility="event.visibility"
      />
    </span>
    <span v-if="event.isArchived" class="block">{{ t('archived') }}</span>
    <span v-else-if="event.visibility === 'PUBLIC'" class="block">
      {{ t('public') }}
    </span>
    <span v-else-if="event.visibility === 'PRIVATE'" class="block">
      {{ t('private') }}
    </span>
    <span v-else class="block">{{ t('bug') }}</span>
  </EventDashlet>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Event } from '~/types/event'

export default defineComponent({
  props: {
    event: {
      required: true,
      type: Object as PropType<Event>,
    },
  },
  setup() {
    const { t } = useI18n()

    const methods = {
      t,
    }

    return {
      ...methods,
    }
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
