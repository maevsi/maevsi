<template>
  <div class="flex justify-center">
    <FontAwesomeIcon
      class="animate-spin"
      :icon="['fas', 'spinner']"
      size="2x"
      :title="$t('globalLoading')"
    />
  </div>
</template>

<script>
export default {
  props: {
    classSize: {
      type: String,
      default: 'h-16 w-16',
    },
  },
}
</script>
