<template>
  <ButtonColored
    :aria-label="$t('home')"
    :icon-id="['fas', 'home']"
    :to="localePath('/')"
    @click="$emit('click')"
  >
    {{ $t('home') }}
  </ButtonColored>
</template>

<i18n lang="yml">
de:
  home: Nach Hause
en:
  home: Head home
</i18n>
