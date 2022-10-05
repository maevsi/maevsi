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

<script lang="ts">
import { PropType } from 'vue'

export default defineComponent({
  props: {
    append: {
      default: false,
      type: Boolean,
    },
    ariaLabel: {
      required: true,
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    to: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    type: {
      default: 'button',
      type: String as PropType<'button' | 'submit' | 'reset' | undefined>,
    },
  },
  setup() {
    const refs = {
      buttonRef: ref<HTMLButtonElement>(),
    }
    const methods = {
      click() {
        refs.buttonRef.value?.click()
      },
    }

    return {
      ...refs,
      ...methods,
    }
  },
})
</script>
