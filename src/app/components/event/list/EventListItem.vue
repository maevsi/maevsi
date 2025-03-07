<template>
  <li
    v-if="event && event.accountByCreatedBy?.username"
    :class="'relative isolate rounded-xl border border-(--semantic-base-line) bg-(--semantic-base-surface-1) shadow-xs ring-blue-500/50 has-focus:ring-3'"
  >
    <EventHeroImage :event="event" />
    <div class="flex flex-col gap-1 rounded-t-none p-2 pb-4">
      <Button
        :aria-label="event.name"
        class="focus:ring-0"
        is-block
        :to="
          localePath({
            name: 'event-view-username-event_name',
            params: {
              username: event.accountByCreatedBy.username,
              event_name: event.slug,
            },
          })
        "
      >
        <span class="absolute inset-0 z-10" />
        <TypographyH6 class="truncate text-3xl font-semibold">
          {{ event.name }}
        </TypographyH6>
      </Button>
      <TypographySubtitleSmall class="truncate">
        {{ eventStart.format('lll') }}
      </TypographySubtitleSmall>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { EventItemFragment } from '~~/gql/generated/graphql'

export interface Props {
  event: Pick<
    EventItemFragment,
    'accountByCreatedBy' | 'name' | 'start' | 'slug'
  >
}
const props = withDefaults(defineProps<Props>(), {})

const localePath = useLocalePath()
const dateTime = useDateTime()
const eventStart = computed(() => dateTime(props.event.start))
</script>
