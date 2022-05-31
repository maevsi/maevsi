<template>
  <CardStateAlert v-if="errors">
    <ol v-if="errors.length > 1" class="list-decimal">
      <li v-for="error in errors" :key="error">
        {{ error }}
      </li>
    </ol>
    <span v-else>
      {{ errors[0] }}
    </span>
  </CardStateAlert>
  <LoaderIndicatorPing v-else-if="indicator === 'ping'" />
  <LoaderIndicatorSpinner v-else-if="indicator === 'spinner'" />
  <LoaderIndicatorText v-else-if="indicator === 'text'" />
  <LoaderIndicatorText v-else />
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'

export default defineComponent({
  name: 'MaevsiLoader',
  props: {
    errors: {
      default: undefined,
      type: Array as PropType<string[] | undefined>,
    },
    indicator: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
  },
})
</script>
