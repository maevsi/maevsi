<template>
  <AppLink v-if="to" :class="classes" :to="to" @click.native="$emit('click')">
    <div class="flex h-full items-center justify-center w-12">
      <slot name="image">
        <FontAwesomeIcon v-if="iconId" :icon="iconId" size="lg" />
      </slot>
    </div>
    <div class="flex items-center">
      <slot />
    </div>
  </AppLink>
  <button v-else :class="classes" @click="$emit('click')">
    <div class="flex h-full items-center justify-center w-12">
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
      default: false,
      type: Boolean,
    },
    iconId: {
      default: undefined,
      type: Array,
    },
    to: {
      default: undefined,
      type: String,
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
