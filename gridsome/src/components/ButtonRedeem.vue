<template>
  <Button
    :icon-id="['fas', 'key']"
    :link="'/redeem'"
    :wrapper-class="wrapperClass"
    :text="'Redeem invite'"
  />
</template>

<script>
import Button from '~/components/Button.vue'

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
    },
    wrapperClass: {
      type: String,
      default: undefined
    }
  }
}
</script>
