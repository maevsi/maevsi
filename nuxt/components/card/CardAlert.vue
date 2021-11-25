<template>
  <Card
    v-if="$slots.default || errorMessage"
    class="bg-red-600 border-0 font-medium overflow-hidden text-center text-white"
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
import { defineComponent, PropType } from '@nuxtjs/composition-api'

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
