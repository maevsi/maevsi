<template>
  <AppLink
    class="group rounded-xl text-(--semantic-base-text-secondary) aria-[current=page]:bg-(--accent-weak) aria-[current=page]:text-(--semantic-accent-accent-text) lg:text-(--semantic-base-text-primary)"
    :is-colored="false"
    :to="props.to"
  >
    <div class="mx-4.5 my-3 flex items-center gap-1.5">
      <slot />
      <TypographySubtitleSmall
        class="line-clamp-1 hidden group-aria-[current=page]:block lg:block"
      >
        {{ title }}
      </TypographySubtitleSmall>
    </div>
  </AppLink>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

export interface Props {
  title: string
  to: RouteLocationRaw
}
const props = withDefaults(defineProps<Props>(), {})
</script>
