<template>
  <i18n-t class="truncate-overflow max-w-full" keypath="eventAuthor" tag="span">
    <template #username>
      <AppLink
        v-if="link"
        :to="
          localePath({
            name: 'account-view-username',
            params: { username },
          })
        "
      >
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

useI18n() // TODO: use i18n-t without useI18n (https://github.com/intlify/vue-i18n-next/issues/1274)
const localePath = useLocalePath()
</script>

<script lang="ts">
export default {
  name: 'AppOwner',
}
</script>

<i18n lang="yaml">
de:
  eventAuthor: von {username}
en:
  eventAuthor: by {username}
</i18n>
