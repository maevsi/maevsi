<template>
  <div class="container mx-auto p-4 md:px-8">
    <Header @onMenuShow="menuShow" />
    <main class="min-h-screen flex-1 overflow-hidden">
      <slot />
    </main>
    <Footer />
    <div
      class="fixed bottom-0 left-0 right-0 top-0 z-10 transition duration-500"
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
      <Menu v-if="isMenuVisiblePartly" is-closable @onMenuHide="menuHide" />
    </div>
    <!-- <CookieControl :locale="locale" /> -->
  </div>
</template>

<script setup lang="ts">
const { $moment } = useNuxtApp()
const router = useRouter()
const { locale, t } = useI18n()
const head = useLocaleHead({ addSeoAttributes: true })
const host = useHost()

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
useHead({
  bodyAttrs: {
    class:
      'bg-background-bright dark:bg-background-dark font-sans text-text-dark dark:text-text-bright',
  },
  link: [
    {
      href: '/assets/static/favicon/apple-touch-icon.png?v=bOXMwoKlJr',
      rel: 'apple-touch-icon',
      sizes: '180x180',
    },
    {
      href: '/assets/static/favicon/favicon-16x16.png?v=bOXMwoKlJr',
      rel: 'icon',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      href: '/assets/static/favicon/favicon-32x32.png?v=bOXMwoKlJr',
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      href: '/assets/static/favicon/favicon.ico',
      rel: 'icon',
      type: 'image/x-icon',
    },
    {
      href: '/assets/static/favicon/site.webmanifest?v=bOXMwoKlJr',
      rel: 'manifest',
    },
    {
      color: '#202020',
      href: '/assets/static/favicon/safari-pinned-tab.svg?v=bOXMwoKlJr',
      rel: 'mask-icon',
    },
    {
      href: '/assets/static/favicon/favicon.ico?v=bOXMwoKlJr',
      rel: 'shortcut icon',
    },
  ],
  meta: [
    { charset: 'utf-8' },
    { content: 'width=device-width, initial-scale=1', name: 'viewport' },
    {
      hid: 'description',
      name: 'description',
      property: 'description',
      content: t('globalOgSeoDescription'),
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: t('globalOgSeoDescription'),
    },
    {
      content: '/assets/static/favicon/browserconfig.xml?v=bOXMwoKlJr',
      name: 'msapplication-config',
    },
    {
      content: '#202020',
      name: 'msapplication-TileColor',
    },
    {
      content: '#202020',
      name: 'theme-color',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: `https://${host}/assets/static/logos/maevsi_with-text_open-graph.png`, // Does not support .svg as of 2021-06.
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: t('globalOgImageAlt'),
    },
    {
      hid: 'og:image:height',
      property: 'og:image:height',
      content: '627',
    },
    {
      hid: 'og:image:width',
      property: 'og:image:width',
      content: '1200',
    },
    {
      hid: 'og:site_name',
      property: 'og:site_name',
      content: 'maevsi',
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'website', // https://ogp.me/#types
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'maevsi',
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: 'https://' + host + router.currentRoute.value.fullPath,
    },
    {
      hid: 'twitter:card',
      property: 'twitter:card',
      content: 'summary',
    },
    {
      hid: 'twitter:description',
      property: 'twitter:description',
      content: t('globalOgSeoDescription'),
    },
    {
      hid: 'twitter:image',
      property: 'twitter:image',
      content: `https://${host}/assets/static/logos/maevsi_with-text_open-graph.png`, // Does not support .svg as of 2021-06.
    },
    {
      hid: 'twitter:image:alt',
      property: 'twitter:image:alt',
      content: t('globalOgImageAlt'),
    },
    // TODO: Get access to the @maevsi handle.
    // {
    //   hid: 'twitter:site',
    //   property: 'twitter:site',
    //   content: '@maevsi',
    // },
    {
      hid: 'twitter:title',
      property: 'twitter:title',
      content: 'maevsi',
    },
  ],
  titleTemplate: (titleChunk: string) => {
    return titleChunk ? `${titleChunk} · maevsi` : 'maevsi'
  },
  ...head.value,
})

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
