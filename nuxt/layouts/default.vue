<template>
  <div class="container mx-auto p-4 md:px-8">
    <div class="min-h-screen pb-32">
      <LayoutHeader @onMenuShow="menuShow" />
      <main class="flex-1 overflow-hidden">
        <slot />
      </main>
    </div>
    <LayoutFooter />
    <div
      class="fixed bottom-0 left-0 right-0 top-0 z-10 transition duration-500 lg:hidden"
      :class="[
        ...(isMenuVisible
          ? ['backdrop-brightness-50 backdrop-blur']
          : ['backdrop-brightness-100 backdrop-blur-0']),
        ...(isMenuVisiblePartly ? [] : ['invisible']),
      ]"
      @click="menuHide"
    />
    <div
      class="fixed bottom-0 left-0 top-0 z-10 flex transform-gpu flex-col overflow-auto transition-transform duration-500 lg:hidden"
      :class="isMenuVisible ? 'translate-x-0' : '-translate-x-full'"
    >
      <LayoutMenu
        v-if="isMenuVisiblePartly"
        is-closable
        @onMenuHide="menuHide"
      />
    </div>
    <!-- <CookieControl :locale="locale" /> -->
  </div>
</template>

<script setup lang="ts">
const { $moment } = useNuxtApp()
const { locale } = useI18n()

// data
const isMenuVisible = ref(false)
const isMenuVisiblePartly = ref(false)

// methods
function menuHide(): void {
  isMenuVisible.value = false
  setTimeout(() => {
    isMenuVisiblePartly.value = false
  }, 500)
}
function menuShow(): void {
  isMenuVisiblePartly.value = true
  isMenuVisible.value = true
}

// initialization
useHeadLayout()
$moment.locale(locale.value)
</script>

<script lang="ts">
export default {
  name: 'IndexPage',
}
</script>

<style>
#logo {
  background-image: url('/assets/static/logos/maevsi.svg');
  background-repeat: no-repeat;
}

html.dark #logo {
  background-image: url('/assets/static/logos/maevsi_with-text_white.svg');
}

html.light #logo {
  background-image: url('/assets/static/logos/maevsi_with-text_black.svg');
}
</style>
