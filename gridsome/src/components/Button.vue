<template>
  <!-- eslint-disable vue/attribute-hyphenation -->
  <g-link
    v-if="link !== undefined"
    tabIndex="-1"
    :to="link"
  >
    <!-- eslint-enable vue/attribute-hyphenation -->
    <button class="btn btn-red">
      <font-awesome
        class="mr-2"
        :icon="iconId"
      />{{ text }}
    </button>
  </g-link>
  <button
    v-else
    class="btn btn-red"
  >
    <font-awesome
      class="mr-2"
      :icon="iconId"
    />{{ text }}
  </button>
</template>

<script>
export default {
  props: {
    iconId: {
      type: Array,
      default () {
        return ['fas', 'bug']
      }
    },
    link: {
      type: String,
      default: undefined
    },
    text: {
      type: String,
      default: undefined
    }
  }
}
</script>
