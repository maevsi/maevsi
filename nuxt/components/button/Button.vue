<template>
  <AppLink
    v-if="to"
    ref="button"
    :append="append"
    :aria-label="ariaLabel"
    :class="[...(buttonClass ? [buttonClass] : [])].join(' ')"
    :disabled="disabled"
    :is-underlined="false"
    :to="to"
  >
    <FontAwesomeIcon
      v-if="iconId"
      :class="{ 'mr-2': $slots.default }"
      :icon="iconId"
    />
    <slot />
  </AppLink>
  <button
    v-else
    ref="button"
    :aria-label="ariaLabel"
    :class="[...(buttonClass ? [buttonClass] : [])].join(' ')"
    :disabled="disabled"
    :type="type"
    @click="$emit('click')"
  >
    <FontAwesomeIcon
      v-if="iconId"
      :class="{ 'mr-2': $slots.default }"
      :icon="iconId"
    />
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'

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
    buttonClass: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    iconId: {
      default: undefined,
      type: Array as PropType<string[] | undefined>,
    },
    to: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    type: {
      default: 'button',
      type: String,
    },
  },
  methods: {
    click() {
      ;(this.$refs.button as HTMLButtonElement).click()
    },
  },
})
</script>
