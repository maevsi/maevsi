<template>
  <div class="text-center">
    <AppLink
      v-if="to !== undefined"
      :append="append"
      :class="['button', ...(buttonClass ? [buttonClass] : [])].join(' ')"
      :disabled="disabled"
      :icon="icon"
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
        v-if="icon"
        :class="{ 'mr-2': this.$slots.default }"
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
      type: Boolean,
      default: false,
    },
    buttonClass: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: true,
    },
    iconId: {
      type: Array,
      default() {
        return ['fas', 'bug']
      },
    },
    iconSize: {
      type: String,
      default: undefined,
    },
    to: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
}
</script>
