<template>
  <CardState background-color="bg-blue-600" :is-edgy="isEdgy">
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
