<template>
  <div>
    <Header @onMenuShow="menuShow" />
    <main
      class="container mx-auto min-h-screen flex-1 overflow-hidden p-4 md:px-8"
    >
      <nuxt />
    </main>
    <Footer />
    <div
      class="fixed bottom-0 left-0 right-0 top-0 z-10 bg-black transition-opacity duration-500 md:hidden"
      :class="isMenuVisible ? 'visible opacity-50' : 'invisible opacity-0'"
      @click="menuHide"
    />
    <div
      class="fixed bottom-0 left-0 top-0 z-10 flex transform-gpu flex-col overflow-auto transition-transform duration-500 md:hidden"
      :class="isMenuVisible ? 'translate-x-0' : '-translate-x-full'"
    >
      <Menu v-if="isMenuItemsVisible" is-closable @onMenuHide="menuHide" />
    </div>
    <CookieControl :locale="$i18n.locale" />
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'

import { defineComponent, useNuxtApp } from '#app'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const { $i18n, $moment } = useNuxtApp()

    const data = reactive({
      isMenuVisible: false,
      isMenuItemsVisible: false,
    })
    const methods = {
      menuHide(): void {
        data.isMenuVisible = false
        setTimeout(() => {
          data.isMenuItemsVisible = false
        }, 500)
      },
      menuShow(): void {
        data.isMenuItemsVisible = true
        data.isMenuVisible = true
      },
    }

    $moment.locale($i18n.locale)

    return {
      ...data,
      ...methods,
    }
  },
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
})
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
