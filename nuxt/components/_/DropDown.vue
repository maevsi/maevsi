<template>
  <div>
    <div class="flex items-center justify-center" @click="toggleIsOpen">
      <slot />
    </div>
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 right-0 bottom-0 z-10"
      @click="toggleIsOpen"
    />
    <div
      v-if="isOpen"
      ref="dropdown"
      class="fixed z-20 mt-2 flex -translate-x-full flex-col gap-2 rounded-md bg-background-brighten p-2 shadow-lg dark:bg-background-darken"
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
    toggleIsOpen(e: MouseEvent) {
      this.isOpen = !this.isOpen

      if (this.isOpen) {
        document.body.classList.add('overflow-hidden')

        this.$nuxt.$nextTick(() => {
          ;(this.$refs.dropdown as HTMLElement).style.top = e.clientY + 'px'
          ;(this.$refs.dropdown as HTMLElement).style.left = e.clientX + 'px'
        })
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    },
  },
})
</script>
