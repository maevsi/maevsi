<template>
  <div class="inline-block rounded-full bg-red-300 px-2 py-1 text-red-700">
    <slot />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'AppTag',
})
</script>
