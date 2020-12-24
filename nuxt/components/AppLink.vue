<template>
  <a
    v-if="to.match(/^(http(s)?|ftp):\/\//)"
    :href="to"
    rel="noopener noreferrer"
    target="_blank"
  >
    <slot />
  </a>
  <nuxt-link v-else append="append" :to="to">
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
    to: {
      type: String,
      required: true,
    },
  },
}
</script>
