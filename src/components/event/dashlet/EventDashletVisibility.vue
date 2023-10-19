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

<script setup lang="ts">
import type { EventItemFragment } from '~/gql/generated/graphql'

export interface Props {
  event: Pick<EventItemFragment, 'isArchived' | 'visibility'>
}
withDefaults(defineProps<Props>(), {})

const { t } = useI18n()
</script>

<i18n lang="yaml">
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
