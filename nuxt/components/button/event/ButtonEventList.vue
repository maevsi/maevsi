<template>
  <ButtonColored
    :aria-label="$t('eventAll')"
    :to="localePath('/event')"
    @click="$emit('click')"
  >
    {{ $t('eventAll') }}
    <template slot="prefix">
      <IconListUl />
    </template>
  </ButtonColored>
</template>

<i18n lang="yml">
de:
  eventAll: Zeige alle Veranstaltungen
en:
  eventAll: Show all events
</i18n>
