<template>
  <div>
    <Header @onMenuShow="menuShow" />
    <div class="flex">
      <div v-if="signedInUsername" class="hidden md:block">
        <Menu />
      </div>
      <main class="container flex-1 min-h-screen mx-auto px-4 md:px-8 py-8">
        <nuxt />
      </main>
    </div>
    <Footer />
    <div
      class="bg-black bottom-0 duration-500 fixed md:hidden left-0 right-0 top-0 transition-opacity z-10"
      :class="isMenuVisible ? 'opacity-50 visible' : 'opacity-0 invisible'"
      @click="menuHide()"
    />
    <div
      class="bottom-0 duration-500 fixed md:hidden left-0 overflow-auto top-0 transform-gpu transition-transform z-10"
      :class="isMenuVisible ? 'translate-x-0' : '-translate-x-full'"
    >
      <Menu v-if="isMenuItemsVisible" is-closable @onMenuHide="menuHide" />
    </div>
    <Modal />
    <CookieControl :locale="$i18n.locale" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapGetters } from 'vuex'

export default defineComponent({
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
