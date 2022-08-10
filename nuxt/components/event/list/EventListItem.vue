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
      :aria-label="event.name"
      :to="localePath('/event/' + event.authorUsername + '/' + event.slug)"
    >
      <Card class="flex-1">
        <!-- <div
          :class="{
            'bg-yellow-100 dark:bg-yellow-900':
              jwtDecoded() && event.authorUsername === jwtDecoded().username,
          }"
        > -->
        <div class="mb-2 flex items-center text-sm">
          <div
            class="truncate font-medium"
            :class="{
              'text-green-700 dark:text-green-600': $moment(
                event.start
              ).isSameOrAfter($moment()),
            }"
          >
            {{ $moment(event.start).format('lll') }}
          </div>
        </div>
        <div class="mb-2 flex items-center text-sm">
          <EventIconVisibility
            class="flex-shrink-0"
            :show-text="false"
            :is-archived="event.isArchived"
            :visibility="event.visibility"
          />
          <div class="flex items-baseline truncate">
            <div class="mx-2 truncate text-xl font-bold">
              {{ event.name }}
            </div>
            <Owner :username="event.authorUsername" />
          </div>
        </div>
        <p v-if="eventDescriptionTemplate" class="text-ellipsis line-clamp-2">
          {{ eventDescriptionTemplate }}
        </p>
        <!-- </div> -->
      </Card>
    </Button>
  </li>
</template>

<script lang="ts">
import { htmlToText } from 'html-to-text'
import DOMPurify from 'isomorphic-dompurify'
import { mapGetters } from 'vuex'
import mustache from 'mustache'

import { computed, defineComponent, PropType } from '#app'
import { Event as MaevsiEvent } from '~/types/event'

export default defineComponent({
  props: {
    event: {
      required: true,
      type: Object as PropType<MaevsiEvent>,
    },
  },
  setup(props) {
    const computations = {
      ...mapGetters(['jwtDecoded']),
      eventDescriptionTemplate: computed(() => {
        if (!props.event?.description) return

        return htmlToText(
          DOMPurify.sanitize(
            mustache.render(props.event.description, {
              event: props.event,
            })
          ),
          {
            selectors: [{ selector: 'a', options: { ignoreHref: true } }],
          }
        )
      }),
    }

    return {
      ...computations,
    }
  },
})
</script>
