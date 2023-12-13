<template>
  <Card>
    <div class="flex items-center gap-4">
      <div class="px-2">
        <slot />
      </div>
      <div class="flex flex-1 flex-col">
        <span class="font-bold">{{ title }}</span>
        <span v-if="description" class="opacity-60">
          {{ description }}
        </span>
      </div>
      <div class="opacity-60">
        <slot v-if="$slots.iconSecondary" name="iconSecondary" />
        <div v-else>
          <IHeroiconsArrowTopRightOnSquare v-if="isExternal" />
          <IHeroiconsChevronRight v-else />
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
export interface Props {
  description?: string
  isExternal?: boolean
  title: string
}
withDefaults(defineProps<Props>(), {
  description: undefined,
  isExternal: undefined,
})
</script>
