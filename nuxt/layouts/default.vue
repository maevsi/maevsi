<template>
  <div>
    <div class="container min-h-screen mx-auto p-4">
      <Header @onMenuShow="menuShow" />
      <main>
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
        flex-col
        inline-flex
        items-start
        overflow-auto
        p-2
        right-0
        top-0
        transform-gpu
        transition-transform
        w-5/6
        md:w-1/2
        lg:w-1/3
      "
      :class="isMenuVisible ? 'translate-x-0' : 'translate-x-full'"
    >
      <Menu v-if="isMenuItemsVisible" @onMenuHide="menuHide" />
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
