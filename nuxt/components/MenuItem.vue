<template>
  <nuxt-link v-if="to" :class="classes" :to="to" @click.native="$emit('click')">
    <div class="flex items-center justify-center w-12">
      <slot name="image">
        <FontAwesomeIcon v-if="iconId" :icon="iconId" size="lg" />
      </slot>
    </div>
    <div class="flex items-center">
      <slot />
    </div>
  </nuxt-link>
  <button v-else :class="classes" @click="$emit('click')">
    <div class="flex items-center justify-center w-12">
      <slot name="image">
        <FontAwesomeIcon v-if="iconId" :icon="iconId" size="lg" />
      </slot>
    </div>
    <div class="flex items-center">
      <slot />
    </div>
  </button>
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
    to: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      classes:
        'inline-flex h-12 items-stretch focus:outline-none focus:ring text-text-dark dark:text-text-bright',
    }
  },
}
</script>
