<template>
  <SBreadcrumb
    :items="items"
    :ui="{
      ol: 'flex gap-2 text-gray-600 dark:text-gray-400',
      li: 'flex items-center whitespace-nowrap leading-loose group',
      item: {
        icon: 'h-5 w-5',
        iconWithLabel: 'mr-1',
        default: ITEM_UI,
        current: ITEM_UI,
        separator: 'ml-2 text-gray-400 dark:text-gray-600',
      },
    }"
  >
    <template #icon>
      <IHeroiconsHome />
    </template>
  </SBreadcrumb>
</template>

<script setup lang="ts">
import type { BreadcrumbItemProps } from 'nuxt-seo-ui'

export interface Props {
  items: (string | BreadcrumbItemProps)[]
}
withDefaults(defineProps<Props>(), {})

// data
const ITEM_UI =
  'flex items-center focus:underline hover:underline group-hover:opacity-80 transition-all aria-[current]:font-bold'
</script>
