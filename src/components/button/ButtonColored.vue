<template>
  <Button
    :is-to-relative="isToRelative"
    :aria-label="ariaLabel"
    class="rounded-md border justify-center px-4 py-2 font-medium"
    :class="
      [
        ...(isPrimary
          ? [
              'border-transparent bg-gray-800 text-text-bright hover:bg-black dark:bg-gray-100 dark:text-text-dark dark:hover:bg-gray-200',
            ]
          : [
              'border-gray-300 text-text-dark hover:bg-black/5 dark:border-gray-600 dark:text-text-bright dark:hover:bg-black/30',
            ]),
      ].join(' ')
    "
    :disabled="disabled"
    :to="to"
    :type="type"
    @click="emit('click')"
  >
    <slot />
    <template #prefix>
      <slot name="prefix" />
    </template>
    <template #suffix>
      <slot name="suffix" />
    </template>
  </Button>
</template>

<script setup lang="ts">
export interface Props {
  ariaLabel: string
  disabled?: boolean
  isPrimary?: boolean
  isToRelative?: boolean
  to?: string
  type?: 'button' | 'reset' | 'submit'
}
withDefaults(defineProps<Props>(), {
  disabled: false,
  isPrimary: true,
  isToRelative: false,
  to: undefined,
  type: 'button',
})

const emit = defineEmits<{
  click: []
}>()
</script>
