<template>
  <Button
    :icon-id="['fas', 'key']"
    :link="'/redeem'"
  >
    Redeem invite
  </Button>
</template>

<script>
import Button from '~/components/buttons/Button.vue'

export default {
  components: {
    Button
  },
  props: {
    iconId: {
      type: Array,
      default () {
        return ['fas', 'bug']
      }
    },
    link: {
      type: String,
      default: undefined
    },
    text: {
      type: String,
      default: undefined
    }
  }
}
</script>
