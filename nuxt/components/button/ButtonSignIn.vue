<template>
  <ButtonColored
    :aria-label="$t('signIn')"
    :icon-id="['fas', 'user']"
    :to="
      localePath({
        path: '/account',
        query: {
          tab: 'signIn',
          ...(isReferring && { referrer: $route.fullPath }),
        },
      })
    "
    @click="$emit('click')"
  >
    {{ $t('signIn') }}
  </ButtonColored>
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  props: {
    isReferring: {
      default: true,
      type: Boolean,
    },
  },
})
</script>

<i18n lang="yml">
de:
  signIn: Anmelden
en:
  signIn: Sign in
</i18n>
