<template>
  <span v-if="span instanceof String">
    {{ span }}
  </span>
  <span v-else-if="Array.isArray(span) && span.length === 1">
    {{ span[0] }}
  </span>
  <ol v-else-if="Array.isArray(span)" class="list-decimal">
    <li v-for="spanItem in span" :key="spanItem.toString()">
      {{ spanItem }}
    </li>
  </ol>
</template>

<script setup lang="ts">
export interface Props {
  span: Array<string | Array<string>>
}
withDefaults(defineProps<Props>(), {})
</script>
