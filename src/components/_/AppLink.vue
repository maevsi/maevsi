<template>
  <a
    v-if="to.match(/^((ftp|http(s)?):\/\/|(mailto):)/)"
    :aria-label="ariaLabel"
    :class="classes"
    :href="to"
    :rel="
      [...(nofollow ? ['nofollow'] : []), 'noopener', 'noreferrer'].join(' ')
    "
    target="_blank"
    @click="emit('click')"
  >
    <slot />
  </a>
  <NuxtLink
    v-else
    :aria-label="ariaLabel"
    :class="classes"
    :to="isToRelative ? append(route.path, to) : to"
    @click="emit('click')"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
export interface Props {
  ariaLabel?: string
  isColored?: boolean
  isToRelative?: boolean
  isUnderlined?: boolean
  nofollow?: boolean
  to: string
}
const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  isColored: true,
  isToRelative: false,
  isUnderlined: false,
  nofollow: false,
})

const emit = defineEmits<{
  click: []
}>()

const route = useRoute()

// computations
const classes = computed(() => {
  return [
    'rounded',
    ...(props.isColored ? ['text-link-dark dark:text-link-bright'] : []),
    ...(props.isUnderlined ? ['underline'] : []),
  ].join(' ')
})
</script>
