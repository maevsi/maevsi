<template>
  <Button :icon-id="['fas', 'key']" :to="localePath('/redeem')">
    {{ $t('redeem') }}
  </Button>
</template>

<i18n lang="yml">
de:
  redeem: 'Einladungscode einlösen'
en:
  redeem: 'Redeem invite code'
</i18n>
