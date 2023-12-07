<template>
  <nav
    class="h-full transform-gpu flex-col overflow-y-auto bg-background-brighten p-8 transition-transform duration-500 dark:bg-background-darken"
    :class="store.isSidebarVisible ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex flex-col gap-4">
      <LayoutMenu />
    </div>
  </nav>
</template>

<script setup lang="ts">
const store = useMaevsiStore()
</script>
