<template>
  <UBreadcrumb v-if="false" class="hidden lg:block" :links="items">
    <template #icon="{ link }">
      <IconLogo
        v-if="link.to === localePath('/')"
        class="h-6 w-6 opacity-40 brightness-0 dark:opacity-50 dark:invert"
      />
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
