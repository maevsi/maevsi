<template>
  <Button
    :button-class="buttonClass"
    :disabled="disabled"
    :icon="icon"
    :icon-id="iconId"
    :link="link"
  >
    <slot />
  </Button>
</template>

<script>
import Button from '~/components/buttons/Button.vue'

export default {
  components: {
    Button,
  },
  props: {
    buttonClass: {
      type: String,
      default: 'bg-green-600 disabled:bg-green-600 hover:bg-green-700',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: true,
    },
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
  },
}
</script>
