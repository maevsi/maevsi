<template>
  <div class="text-center">
    <AppLink
      v-if="to"
      ref="button"
      :append="append"
      :aria-label="ariaLabel"
      :class="['button', ...(buttonClass ? [buttonClass] : [])].join(' ')"
      :disabled="disabled"
      :icon-id="iconId"
      :is-colored="false"
      :to="to"
    >
      <slot />
    </AppLink>
    <button
      v-else
      ref="button"
      :aria-label="ariaLabel"
      :class="['button', ...(buttonClass ? [buttonClass] : [])].join(' ')"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

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
