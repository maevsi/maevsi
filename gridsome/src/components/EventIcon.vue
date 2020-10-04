<template>
  <div v-if="event !== undefined">
    <div v-if="event.archived">
      <FontAwesome
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
      <FontAwesome
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
      <FontAwesome
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
      <FontAwesome
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
    <FontAwesome
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
