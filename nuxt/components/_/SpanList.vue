<template>
  <span
    v-if="span instanceof String || (Array.isArray(span) && span.length === 1)"
  >
    {{ span }}
  </span>
  <ol v-else-if="Array.isArray(span)" class="list-decimal">
    <li v-for="spanItem in span" :key="spanItem.toString()">
      {{ spanItem }}
    </li>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  props: {
    span: {
      required: true,
      type: [String, Array<String>],
    },
  },
})
</script>
