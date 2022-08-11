<template>
  <ButtonText
    :aria-label="$t('new')"
    :is-primary="false"
    :to="localePath('/task/event/create')"
    @click="$emit('click')"
  >
    {{ $t('new') }}
    <template slot="prefix">
      <IconPlus />
    </template>
  </ButtonText>
</template>

<i18n lang="yml">
de:
  new: Veranstaltung erstellen
en:
  new: Create event
</i18n>
