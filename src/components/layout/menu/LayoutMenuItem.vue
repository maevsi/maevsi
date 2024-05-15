<template>
  <AppLink
    active-class="bg-blue-600 dark:bg-blue-400 text-text-bright dark:text-text-dark"
    class="min-w-0 basis-full rounded-xl"
    :is-colored="false"
    :to="props.to"
  >
    <div class="mx-4 my-2 flex flex-col items-center lg:flex-row lg:gap-2">
      <div>
        <slot />
      </div>
      <span class="hidden whitespace-nowrap text-xs sm:block lg:text-lg">
        {{ title }}
      </span>
    </div>
  </AppLink>
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
  title: string
  to: NuxtRoute<T, P, E>
}
const props = withDefaults(defineProps<Props<T, P, E>>(), {})
</script>
