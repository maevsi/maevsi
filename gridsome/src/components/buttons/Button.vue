<template>
  <div class="inline-block">
    <!-- eslint-disable vue/attribute-hyphenation -->
    <g-link
      v-if="link !== undefined"
      tabIndex="-1"
      :to="link"
    >
      <!-- eslint-enable vue/attribute-hyphenation -->
      <button
        class="btn"
        :class="buttonClass"
        :disabled="disabled"
      >
        <font-awesome
          v-if="icon"
          class="mr-2"
          :icon="iconId"
        />
        <slot />
      </button>
    </g-link>
    <button
      v-else
      class="btn"
      :class="buttonClass"
      :disabled="disabled"
    >
      <font-awesome
        v-if="icon"
        class="mr-2"
        :icon="iconId"
      />
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    buttonClass: {
      type: String,
      default: 'btn-red'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: true
    },
    iconId: {
      type: Array,
      default () {
        return ['fas', 'bug']
      }
    },
    link: {
      type: String,
      default: undefined
    }
  }
}
</script>
