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

<script setup lang="ts" generic="T extends RoutesNamesList, P extends string">
import type { NuxtRoute, RoutesNamesList } from '@typed-router'

export interface Props<T extends RoutesNamesList, P extends string> {
  ariaLabel: string
  to?: NuxtRoute<T, P>
}
const props = withDefaults(defineProps<Props<T, P>>(), {
  to: undefined,
})

const emit = defineEmits<{
  onMenuHide: []
}>()

const route = useRoute()
</script>
