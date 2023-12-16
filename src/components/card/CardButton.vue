<template>
  <Button
    :aria-label="title"
    class="rounded-lg text-left"
    is-block
    :disabled="isDisabled"
    :is-external="props.isExternal"
    is-external-icon-disabled
    :to="props.to"
  >
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
          <div v-else-if="props.to">
            <IHeroiconsArrowTopRightOnSquare v-if="isExternal" />
            <IHeroiconsChevronRight v-else />
          </div>
        </div>
      </div>
    </Card>
  </Button>
</template>

<script
  setup
  lang="ts"
  generic="
    T extends RoutesNamesList,
    P extends string,
    E extends boolean = false
  "
>
import type { NuxtRoute, RoutesNamesList } from '@typed-router'

export interface Props<
  T extends RoutesNamesList,
  P extends string,
  E extends boolean = false,
> {
  description?: string
  isDisabled?: boolean
  isExternal?: E
  title: string
  to?: NuxtRoute<T, P, E>
}
const props = withDefaults(defineProps<Props<T, P, E>>(), {
  description: undefined,
  isDisabled: undefined,
  isExternal: undefined,
  to: undefined,
})
</script>
