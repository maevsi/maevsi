<template>
  <li
    class="mb-2 last:mb-0"
    :class="{
      'opacity-75': $moment(event.end).isBefore($moment()),
    }"
  >
    <nuxt-link
      class="card flex flex-col"
      :class="{
        'bg-yellow-100':
          $store.state.jwtDecoded &&
          event.authorUsername === $store.state.jwtDecoded.username,
      }"
      :to="localePath('/event/' + event.authorUsername + '/' + event.slug)"
    >
      <div :class="{ 'opacity-75': $moment(event.start).isBefore($moment()) }">
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
            <Owner class="truncate" :username="event.authorUsername" />
          </div>
        </div>
        <p
          v-if="event.description"
          class="line-clamp-box line-clamp-2 text-text-dark"
        >
          {{ $htmlToText($md.render(event.description)) }}
        </p>
      </div>
    </nuxt-link>
  </li>
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
