<template>
  <Button
    :aria-label="ariaLabel"
    class="p-4"
    :class="{
      'bg-white dark:bg-gray-800': route.fullPath === to,
    }"
    :to="props.to"
    @click="emit('onMenuHide')"
  >
    <slot />
  </Button>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

export interface Props {
  ariaLabel: string
  to?: RouteLocationRaw
}
const props = withDefaults(defineProps<Props>(), {
  to: undefined,
})

const emit = defineEmits<{
  onMenuHide: []
}>()

const route = useRoute()
</script>
