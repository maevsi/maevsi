<template>
  <div class="flex justify-center">
    <div class="animate-pulse" :title="$t('globalLoading')">
      {{ $t('globalLoading') }}
    </div>
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
