<template>
  <div v-if="event !== undefined">
    <div v-if="event.archived">
      <font-awesome
        :icon="['fas', 'archive']"
        title="archived"
      />
      <span
        v-if="withText"
        class="block"
      >
        archived
      </span>
    </div>
    <div v-else-if="event.visibility === 'PUBLIC'">
      <font-awesome
        :icon="['fas', 'globe-africa']"
        title="public"
      />
      <span
        v-if="withText"
        class="block"
      >
        public
      </span>
    </div>
    <div v-else-if="event.visibility === 'PRIVATE'">
      <font-awesome
        :icon="['fas', 'key']"
        title="private"
      />
      <span
        v-if="withText"
        class="block"
      >
        private
      </span>
    </div>
    <div v-else>
      <font-awesome
        :icon="['fas', 'bug']"
        title="bug"
      />
      <span
        v-if="withText"
        class="block"
      >
        bug
      </span>
    </div>
  </div>
  <div v-else>
    <font-awesome
      :icon="['fas', 'bug']"
      title="bug"
    />
    <span
      v-if="withText"
      class="block"
    >
      bug
    </span>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      default: undefined
    },
    withText: {
      type: Boolean,
      default: false
    }
  }
}
</script>
