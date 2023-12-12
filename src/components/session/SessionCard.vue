<template>
  <Card>
    <div class="flex flex-nowrap items-center gap-4">
      <slot />
      <div class="flex flex-1 flex-col">
        <span class="font-bold">{{ title }}</span>
        <span class="opacity-60">
          {{ description }}
        </span>
      </div>
      <IHeroiconsChevronRight class="opacity-60" />
    </div>
  </Card>
</template>

<script setup lang="ts">
export interface Props {
  title: string
  description: string
}
withDefaults(defineProps<Props>(), {})
</script>
