<template>
  <div class="text-center">
    <AppLink
      v-if="to !== undefined"
      :append="append"
      :class="['button', ...(buttonClass ? [buttonClass] : [])].join(' ')"
      :disabled="disabled"
      :icon-id="iconId"
      :icon-size="iconSize"
      :to="to"
    >
      <slot />
    </AppLink>
    <button
      v-else
      :class="['button', ...(buttonClass ? [buttonClass] : [])].join(' ')"
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
}
</script>
