<template>
  <i18n-t class="max-w-full truncate" keypath="eventAuthor">
    <template #username>
      <AppLink v-if="link" :to="localePath('/account/' + username)">
        {{ username }}
      </AppLink>
      <span v-else>
        {{ username }}
      </span>
    </template>
  </i18n-t>
</template>

<script setup lang="ts">
export interface Props {
  link?: boolean
  username: string
}
withDefaults(defineProps<Props>(), {
  link: false,
})

const localePath = useLocalePath()
</script>

<script lang="ts">
export default {
  name: 'MaevsiOwner',
}
</script>

<i18n lang="yml">
de:
  eventAuthor: von {username}
en:
  eventAuthor: by {username}
</i18n>
