<template>
  <li
    class="mb-2 last:mb-0"
    :class="{
      'opacity-75': $moment(event.start).isBefore($moment()),
    }"
  >
    <nuxt-link
      class="bg-white border border-gray-300 flex flex-col p-4 rounded"
      :class="{
        'bg-yellow-100':
          $store.state.jwtDecoded &&
          event.organizerUsername === $store.state.jwtDecoded.username,
      }"
      :to="localePath('/event/' + event.organizerUsername + '/' + event.slug)"
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
          <EventIcon :event="event" :show-text="false" />
          <div class="flex items-baseline">
            <div class="font-bold mx-2 text-xl truncate">
              {{ event.name }}
            </div>
            <Owner :username="event.organizerUsername" />
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
