<template>
  <Button
    :icon-id="['fas', 'user']"
    :to="
      localePath({
        path: '/account',
        query: { form: 'signIn', referrer: $route.fullPath },
      })
    "
    @click="$emit('click')"
  >
    {{ $t('signIn') }}
  </Button>
</template>

<i18n lang="yml">
de:
  signIn: Anmelden
en:
  signIn: Sign in
</i18n>
