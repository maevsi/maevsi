<template>
  <a
    v-if="to.match(/^((ftp|http(s)?):\/\/|(mailto):)/)"
    :class="linkClasses"
    :href="to"
    :rel="
      [...(nofollow ? ['nofollow'] : []), 'noopener', 'noreferrer'].join(' ')
    "
    target="_blank"
    @click="$emit('click')"
  >
    <slot />
  </a>
  <nuxt-link
    v-else
    :append="append"
    :class="linkClasses"
    :to="to"
    @click.native="$emit('click')"
  >
    <slot />
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  props: {
    append: {
      default: false,
      type: Boolean,
    },
    isColored: {
      default: true,
      type: Boolean,
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
  computed: {
    linkClasses(): string {
      return [
        'rounded',
        ...(this.isColored ? ['text-link-dark dark:text-link-bright'] : []),
      ].join(' ')
    },
  },
})
</script>
