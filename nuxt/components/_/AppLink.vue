<template>
  <a
    v-if="to.match(/^((ftp|http(s)?):\/\/|(mailto):)/)"
    :class="classes"
    :href="to"
    :rel="
      [...(nofollow ? ['nofollow'] : []), 'noopener', 'noreferrer'].join(' ')
    "
    target="_blank"
    @click="$emit('click')"
  >
    <slot />
  </a>
  <NuxtLink
    v-else
    :append="append"
    :class="classes"
    :to="to"
    @click.native="$emit('click')"
  >
    <slot />
  </NuxtLink>
</template>

<script lang="ts">
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
    isUnderlined: {
      default: false,
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
  setup(props) {
    const computations = {
      classes: computed(() => {
        return [
          'rounded',
          ...(props.isColored ? ['text-link-dark dark:text-link-bright'] : []),
          ...(props.isUnderlined ? ['underline'] : []),
        ].join(' ')
      }),
    }

    return {
      ...computations,
    }
  },
})
</script>
