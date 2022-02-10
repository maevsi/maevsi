<template>
  <Card
    v-if="$slots.default || errorMessage"
    class="overflow-hidden border-0 bg-red-600 text-center font-medium text-white"
    :class="{ 'rounded-none': isEdgy }"
    role="alert"
  >
    <span v-if="errorMessage">
      {{ $t('error', { errorMessage }) }}
    </span>
    <slot />
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'

export default defineComponent({
  props: {
    errorMessage: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    isEdgy: {
      default: false,
      type: Boolean,
    },
  },
})
</script>

<i18n lang="yml">
de:
  error: 'Fehler: {errorMessage}'
en:
  error: 'Error: {errorMessage}'
</i18n>
