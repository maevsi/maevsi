<template>
  <a
    v-if="to.match(/^(http(s)?|ftp):\/\//)"
    :href="to"
    rel="noopener noreferrer"
    target="_blank"
  >
    <FontAwesomeIcon
      v-if="iconId"
      :class="{ 'mr-2': this.$slots.default }"
      :icon="iconId"
      :size="iconSize"
    />
    <slot />
  </a>
  <nuxt-link v-else append="append" :to="to">
    <FontAwesomeIcon
      v-if="iconId"
      :class="{ 'mr-2': this.$slots.default }"
      :icon="iconId"
      :size="iconSize"
    />
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    append: {
      type: Boolean,
      default: false,
    },
    iconId: {
      type: Array,
      default: undefined,
    },
    iconSize: {
      type: String,
      default: undefined,
    },
    to: {
      type: String,
      required: true,
    },
  },
}
</script>
