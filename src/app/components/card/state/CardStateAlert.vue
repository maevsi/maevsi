<template>
  <CardState background-color="bg-red-600" :is-edgy="isEdgy" role="alert">
    <slot />
  </CardState>
</template>

<script setup lang="ts">
export interface Props {
  isEdgy?: boolean
}
withDefaults(defineProps<Props>(), {
  isEdgy: false,
})
</script>
