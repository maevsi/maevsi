<template>
  <div class="flex justify-center">
    <div class="flex items-center justify-center" :class="classSize">
      <div
        class="animate-ping bg-gray-500 h-1/2 rounded-full w-1/2"
        :title="$t('globalLoading')"
      />
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
