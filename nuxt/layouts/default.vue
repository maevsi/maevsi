<template>
  <div>
    <Header @onMenuShow="menuShow" />
    <div class="flex">
      <div v-if="signedInUsername" class="hidden md:block">
        <Menu />
      </div>
      <main
        class="container mx-auto min-h-screen flex-1 overflow-hidden px-4 py-8 md:px-8"
      >
        <nuxt />
      </main>
    </div>
    <Footer />
    <div
      class="fixed bottom-0 left-0 right-0 top-0 z-10 bg-black transition-opacity duration-500 md:hidden"
      :class="isMenuVisible ? 'visible opacity-50' : 'invisible opacity-0'"
      @click="menuHide()"
    />
    <div
      class="fixed bottom-0 left-0 top-0 z-10 transform-gpu overflow-auto transition-transform duration-500 md:hidden"
      :class="isMenuVisible ? 'translate-x-0' : '-translate-x-full'"
    >
      <Menu v-if="isMenuItemsVisible" is-closable @onMenuHide="menuHide" />
    </div>
    <Modal />
    <CookieControl :locale="$i18n.locale" />
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'

import { defineComponent } from '#app'

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      isMenuVisible: false,
      isMenuItemsVisible: false,
    }
  },
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
  computed: {
    ...mapGetters(['signedInUsername']),
  },
  beforeCreate() {
    this.$moment.locale(this.$i18n.locale)
  },
  methods: {
    menuHide() {
      this.isMenuVisible = false
      setTimeout(() => {
        this.isMenuItemsVisible = false
      }, 500)
    },
    menuShow() {
      this.isMenuItemsVisible = true
      this.isMenuVisible = true
    },
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
