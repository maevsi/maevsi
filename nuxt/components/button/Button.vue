<template>
  <div class="text-center">
    <AppLink
      v-if="to"
      ref="button"
      :append="append"
      :aria-label="ariaLabel"
      :class="['button', buttonClass].join(' ')"
      :disabled="disabled"
      :icon-id="iconId"
      :icon-size="iconSize"
      :to="to"
    >
      <slot />
    </AppLink>
    <button
      v-else
      ref="button"
      :aria-label="ariaLabel"
      :class="['button', buttonClass].join(' ')"
      :disabled="disabled"
      :type="type"
      @click="$emit('click')"
    >
      <FontAwesomeIcon
        v-if="iconId"
        :class="{ 'mr-2': $slots.default }"
        :icon="iconId"
        :size="iconSize"
      />
      <slot />
    </button>
  </div>
</template>

<script>
export default {
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
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    iconId: {
      default: undefined,
      type: Array,
    },
    iconSize: {
      default: undefined,
      type: String,
    },
    to: {
      default: undefined,
      type: String,
    },
    type: {
      default: 'button',
      type: String,
    },
  },
  methods: {
    click() {
      this.$refs.button.click()
    },
  },
}
</script>
