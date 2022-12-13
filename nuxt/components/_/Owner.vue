<template>
  <i18n-t class="max-w-full truncate" keypath="eventAuthor" tag="span">
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

// TODO: use i18n-t without useI18n (https://github.com/nuxt-modules/i18n/issues/1731)
const x = useI18n() // eslint-disable-line @typescript-eslint/no-unused-vars
const localePath = useLocalePath()
</script>

<script lang="ts">
export default {
  name: 'MaevsiOwner',
}
</script>

<i18n lang="yaml">
de:
  eventAuthor: von {username}
en:
  eventAuthor: by {username}
</i18n>
