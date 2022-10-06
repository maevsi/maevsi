<template>
  <Button
    ref="buttonRef"
    :append="append"
    :aria-label="ariaLabel"
    class="font-medium px-4 py-2"
    :disabled="disabled"
    :to="to"
    :type="type"
    @click="$emit('click')"
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
  append?: boolean
  ariaLabel: string
  disabled?: boolean
  to?: string
  type?: 'button' | 'reset' | 'submit'
}
withDefaults(defineProps<Props>(), {
  append: false,
  disabled: false,
  to: undefined,
  type: 'button',
})

// const refs = {
//   buttonRef: ref<HTMLButtonElement>(),
// }
// const methods = {
//   click() {
//     refs.buttonRef.value?.click()
//   },
// }
</script>
