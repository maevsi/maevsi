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
    <FontAwesomeIcon
      v-if="iconId"
      :class="{ 'mr-2': $slots.default }"
      :icon="iconId"
    />
    <slot />
  </a>
  <nuxt-link
    v-else
    :append="append"
    :class="linkClasses"
    :to="to"
    @click.native="$emit('click')"
  >
    <FontAwesomeIcon
      v-if="iconId"
      :class="{ 'mr-2': $slots.default }"
      :icon="iconId"
    />
    <slot />
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    append: {
      default: false,
      type: Boolean,
    },
    iconId: {
      default: undefined,
      type: Array as PropType<string[] | undefined>,
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
        'items-center inline-flex rounded',
        ...(this.isColored ? ['text-link-dark dark:text-link-bright'] : []),
      ].join(' ')
    },
  },
})
</script>
