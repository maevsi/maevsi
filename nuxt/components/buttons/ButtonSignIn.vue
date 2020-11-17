<template>
  <Button :icon-id="['fas', 'user']" :link="localePath('/account?form=signIn')">
    {{ $t('signIn') }}
  </Button>
</template>

<i18n lang="yml">
de:
  signIn: 'Anmelden'
en:
  signIn: 'Sign in'
</i18n>
