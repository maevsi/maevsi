<template>
  <Button
    :icon-id="['fas', 'plus']"
    :to="localePath('/task/event/create')"
    @click="$emit('click')"
  >
    {{ $t('new') }}
  </Button>
</template>

<i18n lang="yml">
de:
  new: Veranstaltung erstellen
en:
  new: Create event
</i18n>
