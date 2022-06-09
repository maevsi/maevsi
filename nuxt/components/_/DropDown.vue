<template>
  <div class="relative inline-block text-left">
    <div @click="toggleIsOpen">
      <slot />
    </div>
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 right-0 bottom-0 z-10"
      @click="toggleIsOpen"
    />
    <div
      v-if="isOpen"
      class="absolute right-0 z-10 mt-2 flex origin-top-right flex-col gap-2 rounded-md bg-background-dark p-4 shadow-lg"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleIsOpen() {
      this.isOpen = !this.isOpen
    },
  },
})
</script>
