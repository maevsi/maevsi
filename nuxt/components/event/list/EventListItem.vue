<template>
  <li
    class="mb-2 last:mb-0"
    :class="{
      'opacity-75': event.end
        ? $moment(event.end).isBefore($moment())
        : $moment(event.start).isBefore($moment()),
    }"
  >
    <AppLink
      class="card dark:card-dark flex flex-col"
      :class="{
        'bg-yellow-100':
          jwtDecoded && event.authorUsername === jwtDecoded.username,
      }"
      :to="localePath('/event/' + event.authorUsername + '/' + event.slug)"
    >
      <div class="flex items-center mb-2 text-text-dark text-sm">
        <div
          class="font-medium truncate"
          :class="{
            'text-green-700': $moment(event.start).isSameOrAfter($moment()),
          }"
        >
          {{ $moment(event.start).format('lll') }}
        </div>
      </div>
      <div class="flex items-center mb-2 text-text-dark text-sm">
        <EventIconVisibility :event="event" :show-text="false" />
        <div class="flex items-baseline truncate">
          <div class="font-bold mx-2 text-xl truncate">
            {{ event.name }}
          </div>
          <Owner :username="event.authorUsername" />
        </div>
      </div>
      <p
        v-if="event.description"
        class="line-clamp-2 overflow-ellipsis text-text-dark"
      >
        {{ $htmlToText($domPurify.sanitize(event.description)) }}
      </p>
    </AppLink>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { mapGetters } from 'vuex'
import { Event } from '~/types/event'

export default defineComponent({
  props: {
    event: {
      required: true,
      type: Object as PropType<Event>,
    },
  },
  computed: {
    ...mapGetters(['jwtDecoded']),
  },
})
</script>
