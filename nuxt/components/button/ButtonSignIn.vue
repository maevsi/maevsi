<template>
  <ButtonColored
    :aria-label="$t('signIn')"
    :to="localePath({ path: '/task/account/sign-in' })"
    @click="$emit('click')"
  >
    {{ $t('signIn') }}
    <template slot="prefix">
      <IconUser />
    </template>
  </ButtonColored>
</template>

<i18n lang="yml">
de:
  signIn: Anmelden
en:
  signIn: Sign in
</i18n>
