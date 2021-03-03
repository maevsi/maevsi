<template>
  <a
    v-if="to.match(/^(http(s)?|ftp):\/\//)"
    class="items-center flex"
    :href="to"
    :rel="
      [...(nofollow ? ['nofollow'] : []), 'noopener', 'noreferrer'].join(' ')
    "
    target="_blank"
    @click="$emit('click')"
  >
    <FontAwesomeIcon
      v-if="iconId"
      :class="{ 'mr-2': this.$slots.default }"
      :icon="iconId"
      :size="iconSize"
    />
    <slot />
  </a>
  <nuxt-link v-else append="append" :to="to" @click.native="$emit('click')">
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
    nofollow: {
      default: false,
      type: Boolean,
    },
    to: {
      required: true,
      type: String,
    },
  },
}
</script>
