<template>
  <Button
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
  </Button>
</template>

<script>
export default {
  props: {
    isReferring: {
      default: true,
      type: Boolean,
    },
  },
}
</script>

<i18n lang="yml">
de:
  signIn: Anmelden
en:
  signIn: Sign in
</i18n>
