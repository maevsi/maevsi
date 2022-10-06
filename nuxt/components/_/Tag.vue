<template>
  <div class="inline-block rounded-full px-2 py-1 bg-red-300 text-red-700">
    <slot />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'MaevsiTag',
})
</script>
