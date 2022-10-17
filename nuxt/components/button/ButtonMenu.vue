<template>
  <Button
    :aria-label="ariaLabel"
    class="p-4"
    :class="{
      'bg-white dark:bg-gray-800': route.fullPath === to,
    }"
    :to="to"
    @click.native="$emit('onMenuHide')"
  >
    <slot />
  </Button>
</template>

<script setup lang="ts">
export interface Props {
  ariaLabel: string
  to?: string
}
withDefaults(defineProps<Props>(), {
  to: undefined,
})

const route = useRoute()
</script>
