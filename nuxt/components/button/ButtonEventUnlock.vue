<template>
  <ButtonColored
    :aria-label="$t('eventUnlock')"
    :icon-id="['fas', 'key']"
    :to="localePath('/task/event/unlock')"
    @click="$emit('click')"
  >
    {{ $t('eventUnlock') }}
  </ButtonColored>
</template>

<i18n lang="yml">
de:
  eventUnlock: Einladungscode eingeben
en:
  eventUnlock: Enter invitation code
</i18n>
