<template>
  <UBreadcrumb :links="items">
    <template #icon="{ link }">
      <IHeroiconsHome v-if="link.to === localePath('/')" />
    </template>
  </UBreadcrumb>
</template>

<script setup lang="ts">
import type { BreadcrumbLink } from '#ui/types'

export interface Props {
  items: BreadcrumbLink[]
}
withDefaults(defineProps<Props>(), {})

const localePath = useLocalePath()
</script>
