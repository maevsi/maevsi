<template>
  <ButtonPrimary
    :aria-label="$t('eventAll')"
    :icon-id="['fas', 'list-ul']"
    :to="localePath('/event')"
    @click="$emit('click')"
  >
    {{ $t('eventAll') }}
  </ButtonPrimary>
</template>

<i18n lang="yml">
de:
  eventAll: Zeige alle Veranstaltungen
en:
  eventAll: Show all events
</i18n>
