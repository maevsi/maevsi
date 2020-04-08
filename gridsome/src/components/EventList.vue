<template>
  <div class="m-auto w-full">
    <ul
      v-if="events.nodes && events.nodes.length"
      class="mx-4 text-left"
    >
      <g-link
        v-for="event in events.nodes"
        :key="event.id"
        :to="'/events/' + event.organizerUsername + '/' + event.slug"
      >
        <li class="mb-2">
          <div class="bg-white border border-gray-400 flex flex-col p-4 rounded">
            <div class="flex items-center mb-2 text-gray-600 text-sm">
              <div
                class="font-medium"
                :class="{
                  'text-gray-600': $moment(event.start).isBefore($moment()),
                  'text-teal-600': $moment(event.start).isSameOrAfter($moment())
                }"
              >
                {{ event.start | moment("lll") }}
              </div>
            </div>
            <div class="flex items-center mb-2 text-gray-600 text-sm">
              <font-awesome
                v-if="event.visibility == 'PUBLIC'"
                class="mr-2"
                :icon="['fas', 'globe-africa']"
                title="public"
              />
              <font-awesome
                v-if="event.visibility == 'PRIVATE'"
                class="mr-2"
                :icon="['fas', 'key']"
                title="private"
              />
              <div
                class="font-bold text-xl"
                :class="{
                  'text-gray-600': $moment(event.start).isBefore($moment()),
                  'text-gray-900': $moment(event.start).isSameOrAfter($moment())
                }"
              >
                {{ event.name }}
              </div>
            </div>
            <p class="line-clamp-box line-clamp-2 text-gray-700">
              {{ event.description }}
            </p>
          </div>
        </li>
      </g-link>
      <div
        v-if="events.pageInfo.hasNextPage"
        class="flex justify-center"
      >
        <button
          class="btn btn-red"
          @click="showMore"
        >
          More
        </button>
      </div>
    </ul>
    <p v-else>
      There are currently no events :/
    </p>
  </div>
</template>

<script>
export default {
  props: {
    events: {
      type: Object,
      default: undefined
    }
  }
}
</script>
