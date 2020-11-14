<template>
  <div class="inline-block">
    <nuxt-link
      v-if="link !== undefined"
      :append="append"
      :class="`${buttonClassStatic} ${buttonClass}`"
      :disabled="disabled"
      :to="link"
    >
      <FontAwesomeIcon
        v-if="icon"
        :class="{ 'mr-2': this.$slots.default }"
        :icon="iconId"
      />
      <slot />
    </nuxt-link>
    <button
      v-else
      :class="`${buttonClassStatic} ${buttonClass}`"
      :disabled="disabled"
      :type="type"
      @click="$emit('click')"
    >
      <FontAwesomeIcon
        v-if="icon"
        :class="{ 'mr-2': this.$slots.default }"
        :icon="iconId"
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
      default:
        'bg-red-600 disabled:bg-red-600 focus:shadow-outline hover:bg-red-700',
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
    link: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
  data() {
    return {
      buttonClassStatic: 'font-bold py-2 px-4 rounded-full shadow text-white',
    }
  },
}
</script>
