<template>
  <!--<div class="flex flex-wrap gap-4 justify-center my-4">-->
  <div class="flex flex-wrap justify-center">
    <slot />
  </div>
</template>

<style scoped>
/* Fallback until gap for flexbox is supported in Safari. */
div {
  margin: 0.5rem -0.5rem;
}
div >>> a,
div >>> div {
  margin: 0.5rem;
}
</style>
