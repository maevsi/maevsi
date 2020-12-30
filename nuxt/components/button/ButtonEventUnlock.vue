<template>
  <Button :icon-id="['fas', 'key']" :to="localePath('/task/event/unlock')">
    {{ $t('eventUnlock') }}
  </Button>
</template>

<i18n lang="yml">
de:
  eventUnlock: 'Einladungscode eingeben'
en:
  eventUnlock: 'Enter invitation code'
</i18n>
