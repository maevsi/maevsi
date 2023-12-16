<template>
  <SBreadcrumb
    :items="items"
    :ui="{
      nav: 'hidden lg:block',
      item: {
        icon: 'h-5 w-5',
        iconWithLabel: 'mr-1',
        default: ITEM_UI,
        current: ITEM_UI,
      },
      li: 'flex items-center whitespace-nowrap leading-loose group',
      ol: 'flex gap-2 text-gray-600 dark:text-gray-400',
    }"
  >
    <template #icon>
      <IHeroiconsHome />
    </template>
    <template #separator>
      <IHeroiconsChevronRight
        class="ml-2 text-gray-600 dark:text-gray-400"
        height="1em"
        width="1em"
      />
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
