<template>
  <ButtonColored
    :aria-label="$t('new')"
    :icon-id="['fas', 'plus']"
    :to="localePath('/task/event/create')"
    @click="$emit('click')"
  >
    {{ $t('new') }}
  </ButtonColored>
</template>

<i18n lang="yml">
de:
  new: Veranstaltung erstellen
en:
  new: Create event
</i18n>
