<template>
  <ButtonColored
    :aria-label="$t('new')"
    :to="localePath('/task/event/create')"
    @click="$emit('click')"
  >
    {{ $t('new') }}
    <template slot="prefix">
      <IconPlus />
    </template>
  </ButtonColored>
</template>

<i18n lang="yml">
de:
  new: Veranstaltung erstellen
en:
  new: Create event
</i18n>
