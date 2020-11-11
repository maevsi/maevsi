<template>
  <div class="inline-block">
    <!-- eslint-disable vue/attribute-hyphenation -->
    <nuxt-link v-if="link !== undefined" :to="localePath(link)">
      <!-- eslint-enable vue/attribute-hyphenation -->
      <button
        :class="`${buttonClassStatic} ${buttonClass}`"
        :disabled="disabled"
        :type="type"
      >
        <FontAwesomeIcon v-if="icon" class="mr-2" :icon="iconId" />
        <slot />
      </button>
    </nuxt-link>
    <button
      v-else
      :class="`${buttonClassStatic} ${buttonClass}`"
      :disabled="disabled"
      :type="type"
    >
      <FontAwesomeIcon v-if="icon" class="mr-2" :icon="iconId" />
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  props: {
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
