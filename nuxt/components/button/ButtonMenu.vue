<template>
  <Button
    :aria-label="ariaLabel"
    class="p-4"
    :class="{
      'bg-white dark:bg-gray-800': routeFullPath === to,
    }"
    :to="to"
    @click.native="$emit('onMenuHide')"
  >
    <slot />
  </Button>
</template>

<script lang="ts">
import { PropType } from 'vue'

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
  setup() {
    const route = useRoute()

    const data = reactive({
      routeFullPath: route.fullPath,
    })

    return {
      ...data,
    }
  },
})
</script>
