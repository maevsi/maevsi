<template>
  <div>
    <div class="flex items-center justify-center" @click="toggleIsOpen">
      <slot />
    </div>
    <div
      class="fixed inset-0 z-10 transition"
      :class="
        isOpen
          ? 'backdrop-blur-sm backdrop-brightness-75'
          : 'invisible backdrop-blur-0 backdrop-brightness-100'
      "
      @click="toggleIsOpen"
    />
    <div
      v-if="isOpen"
      ref="dropdownRef"
      class="fixed z-20 mt-2 flex -translate-x-full flex-col items-stretch gap-4 rounded-md bg-background-brighten p-4 shadow-lg dark:bg-background-darken"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
// refs
const dropdownRef = ref<HTMLElement>()

// data
const isOpen = ref(false)

// methods
const toggleIsOpen = async (e: MouseEvent) => {
  isOpen.value = !isOpen.value

  if (isOpen.value) {
    document.body.classList.add('overflow-hidden')

    await nextTick()

    if (dropdownRef.value) {
      dropdownRef.value.style.top = e.clientY + 'px'
      dropdownRef.value.style.left = e.clientX + 'px'
    }
  } else {
    document.body.classList.remove('overflow-hidden')
  }
}

// lifecycle
onUnmounted(() => document.body.classList.remove('overflow-hidden'))
</script>
