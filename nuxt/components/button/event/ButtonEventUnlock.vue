<template>
  <ButtonColored
    :aria-label="$t('eventUnlock')"
    :to="localePath('/task/event/unlock')"
    @click="$emit('click')"
  >
    {{ $t('eventUnlock') }}
    <template slot="prefix">
      <IconKey />
    </template>
  </ButtonColored>
</template>

<i18n lang="yml">
de:
  eventUnlock: Einladungscode eingeben
en:
  eventUnlock: Enter invitation code
</i18n>
