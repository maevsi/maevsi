<template>
  <Button
    :aria-label="ariaLabel"
    class="p-4"
    :class="{
      'bg-white dark:bg-gray-800': $route.fullPath === to,
    }"
    :to="to"
    @click.native="$emit('onMenuHide')"
  >
    <slot />
  </Button>
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'

export default defineComponent({
  props: {
    ariaLabel: {
      required: true,
      type: String,
    },
    to: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
  },
})
</script>
