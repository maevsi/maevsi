<template>
  <Button :icon-id="['fas', 'key']" link="/redeem">{{ $t('redeem') }}</Button>
</template>

<script>
export default {
  props: {
    iconId: {
      type: Array,
      default() {
        return ['fas', 'bug']
      },
    },
    link: {
      type: String,
      default: undefined,
    },
    text: {
      type: String,
      default: undefined,
    },
  },
}
</script>

<i18n lang="yml">
de:
  redeem: 'Einladungscode einlösen'
en:
  redeem: 'Redeem invite code'
</i18n>
