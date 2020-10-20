<template>
  <Button :icon-id="['fas', 'key']" :link="'/redeem'"> Redeem invite </Button>
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
