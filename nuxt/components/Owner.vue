<template>
  <i18n path="eventOrganizer">
    <template #username>
      <nuxt-link v-if="link" :to="localePath('/account/' + username)">
        {{ username }}
      </nuxt-link>
      <span v-else>
        {{ username }}
      </span>
    </template>
  </i18n>
</template>

<script>
export default {
  props: {
    link: {
      default: false,
      type: Boolean,
    },
    username: {
      default: undefined,
      type: String,
    },
  },
}
</script>

<i18n lang="yml">
de:
  eventOrganizer: 'von {username}'
en:
  eventOrganizer: 'by {username}'
</i18n>
