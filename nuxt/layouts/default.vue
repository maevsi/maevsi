<template>
  <div>
    <Header @onMenuShow="menuShow" />
    <div class="flex">
      <div
        v-if="$store.state.signedInUsername"
        class="bg-background-bright dark:bg-background-dark hidden md:block"
      >
        <Menu />
      </div>
      <main class="container flex-1 min-h-screen mx-auto px-4 md:px-8 py-8">
        <nuxt />
      </main>
    </div>
    <Footer />
    <div
      class="
        bg-black
        bottom-0
        duration-500
        fixed
        md:hidden
        left-0
        right-0
        top-0
        transition-opacity
      "
      :class="isMenuVisible ? 'opacity-50 visible' : 'opacity-0 invisible'"
      @click="menuHide()"
    />
    <div
      class="
        bg-background-bright
        dark:bg-background-dark
        bottom-0
        duration-500
        fixed
        md:hidden
        flex-col
        inline-flex
        items-start
        left-0
        overflow-auto
        p-2
        top-0
        transform-gpu
        transition-transform
      "
      :class="isMenuVisible ? 'translate-x-0' : '-translate-x-full'"
    >
      <Menu v-if="isMenuItemsVisible" is-closable @onMenuHide="menuHide" />
    </div>
    <Modal />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuVisible: false,
      isMenuItemsVisible: false,
    }
  },
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
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
}
</script>

<style>
#logo {
  background-image: url(/assets/static/logos/maevsi.svg);
  background-repeat: no-repeat;
  background-size: contain;
}
@media (prefers-color-scheme: dark) {
  #logo {
    background-image: url(/assets/static/logos/maevsi_with-text_white.svg);
  }
}
@media (prefers-color-scheme: light) {
  #logo {
    background-image: url(/assets/static/logos/maevsi_with-text_black.svg);
  }
}
</style>
