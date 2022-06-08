<template>
  <div class="relative inline-block text-left">
    <slot />
    <div
      class="absolute right-0 mt-2 flex origin-top-right flex-col gap-2 rounded-md bg-background-dark p-2 shadow-lg"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({})
</script>
