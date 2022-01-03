<template>
  <li
    v-if="event"
    class="mb-2 last:mb-0"
    :class="{
      'opacity-75': event.end
        ? $moment(event.end).isBefore($moment())
        : $moment(event.start).isBefore($moment()),
    }"
  >
    <Button
      class="flex flex-col"
      :to="localePath('/event/' + event.authorUsername + '/' + event.slug)"
    >
      <Card>
        <!-- <div
          :class="{
            'bg-yellow-100 dark:bg-yellow-900':
              jwtDecoded && event.authorUsername === jwtDecoded.username,
          }"
        > -->
        <div class="flex items-center mb-2 text-sm">
          <div
            class="font-medium truncate"
            :class="{
              'text-green-700 dark:text-green-600': $moment(
                event.start
              ).isSameOrAfter($moment()),
            }"
          >
            {{ $moment(event.start).format('lll') }}
          </div>
        </div>
        <div class="flex items-center mb-2 text-sm">
          <EventIconVisibility :event="event" :show-text="false" />
          <div class="flex items-baseline truncate">
            <div class="font-bold mx-2 text-xl truncate">
              {{ event.name }}
            </div>
            <Owner :username="event.authorUsername" />
          </div>
        </div>
        <p v-if="eventDescriptionTemplate" class="line-clamp-2 text-ellipsis">
          {{
            $htmlToText($domPurify.sanitize(eventDescriptionTemplate), {
              selectors: [{ selector: 'a', options: { ignoreHref: true } }],
            })
          }}
        </p>
        <!-- </div> -->
      </Card>
    </Button>
  </li>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import mustache from 'mustache'

import { defineComponent, PropType } from '#app'
import { Event as MaevsiEvent } from '~/types/event'

export default defineComponent({
  props: {
    event: {
      required: true,
      type: Object as PropType<MaevsiEvent>,
    },
  },
  computed: {
    ...mapGetters(['jwtDecoded']),
    eventDescriptionTemplate(): string | undefined {
      if (!this.event?.description) return

      return mustache.render(this.event.description, {
        event: this.event,
      })
    },
  },
})
</script>
