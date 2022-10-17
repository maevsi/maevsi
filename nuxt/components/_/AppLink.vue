<template>
  <a
    v-if="to.match(/^((ftp|http(s)?):\/\/|(mailto):)/)"
    :class="classes"
    :href="to"
    :rel="
      [...(nofollow ? ['nofollow'] : []), 'noopener', 'noreferrer'].join(' ')
    "
    target="_blank"
    @click="$emit('click')"
  >
    <slot />
  </a>
  <NuxtLink
    v-else
    :append="append"
    :class="classes"
    :to="to"
    @click.native="$emit('click')"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
export interface Props {
  append?: boolean
  isColored?: boolean
  isUnderlined?: boolean
  nofollow?: boolean
  to: string
}
const props = withDefaults(defineProps<Props>(), {
  append: false,
  isColored: true,
  isUnderlined: false,
  nofollow: false,
})

// computations
const classes = computed(() => {
  return [
    'rounded',
    ...(props.isColored ? ['text-link-dark dark:text-link-bright'] : []),
    ...(props.isUnderlined ? ['underline'] : []),
  ].join(' ')
})
</script>
