<template>
  <i18n class="max-w-full truncate" path="eventAuthor">
    <template #username>
      <AppLink v-if="link" :to="localePath('/account/' + username)">
        {{ username }}
      </AppLink>
      <span v-else>
        {{ username }}
      </span>
    </template>
  </i18n>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MaevsiOwner',
  props: {
    link: {
      default: false,
      type: Boolean,
    },
    username: {
      required: true,
      type: String,
    },
  },
  setup() {
    const localePath = useLocalePath()

    const methods = {
      localePath,
    }

    return {
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  eventAuthor: von {username}
en:
  eventAuthor: by {username}
</i18n>
