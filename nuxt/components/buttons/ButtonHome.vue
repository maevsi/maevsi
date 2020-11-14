<template>
  <Button :icon-id="['fas', 'home']" :link="localePath('/')">{{
    $t('home')
  }}</Button>
</template>

<i18n lang="yml">
de:
  home: 'Nach Hause'
en:
  home: 'Head home'
</i18n>
