<template>
  <div
    v-if="$slots.default || errorMessage"
    class="
      card
      bg-red-100
      border border-red-700
      overflow-hidden
      text-center text-red-700
    "
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
  },
}
</script>

<i18n lang="yml">
de:
  error: 'Fehler: {errorMessage}'
en:
  error: 'Error: {errorMessage}'
</i18n>
