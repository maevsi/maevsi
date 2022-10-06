<template>
  <AppLink
    v-if="to"
    ref="buttonRef"
    :append="append"
    :aria-label="ariaLabel"
    :class="classes"
    :disabled="disabled"
    :is-colored="false"
    :to="to"
  >
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </AppLink>
  <button
    v-else
    ref="buttonRef"
    :aria-label="ariaLabel"
    :class="classes"
    :disabled="disabled"
    :type="type"
    @click="$emit('click')"
  >
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </button>
</template>

<script lang="ts">
import { PropType } from 'vue'

export default defineComponent({
  name: 'MaevsiButton',
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
    isBlock: {
      default: false,
      type: Boolean,
    },
    isLinkColored: {
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
  setup(props) {
    const refs = {
      buttonRef: ref<HTMLButtonElement>(),
    }
    const methods = {
      click() {
        refs.buttonRef.value?.click()
      },
    }
    const computations = {
      classes: computed(() => {
        return [
          ...(props.isBlock ? ['block'] : ['inline-flex items-center gap-2']),
          ...(props.isLinkColored
            ? ['text-link-dark dark:text-link-bright']
            : []),
        ].join(' ')
      }),
    }

    return {
      ...refs,
      ...methods,
      ...computations,
    }
  },
})
</script>
