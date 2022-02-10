<template>
  <ButtonColored
    :aria-label="$t('home')"
    :to="localePath('/')"
    @click="$emit('click')"
  >
    {{ $t('home') }}
    <template slot="prefix">
      <IconHome />
    </template>
  </ButtonColored>
</template>

<i18n lang="yml">
de:
  home: Nach Hause
en:
  home: Head home
</i18n>
