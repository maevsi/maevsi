<template>
  <div
    v-if="$slots.default || errorMessage"
    class="
      bg-red-600
      border-0
      card
      font-medium
      overflow-hidden
      text-center text-white
    "
    :class="{ 'rounded-none': isEdgy }"
    role="alert"
  >
    <span v-if="errorMessage">
      {{ $t('error', { errorMessage }) }}
    </span>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: {
      default: undefined,
      type: String,
    },
    isEdgy: {
      default: false,
      type: Boolean,
    },
  },
}
</script>

<i18n lang="yml">
de:
  error: 'Fehler: {errorMessage}'
en:
  error: 'Error: {errorMessage}'
</i18n>
