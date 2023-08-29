export const useHeadLayout = () => {
  const router = useRouter()
  const host = useHost()
  const { t } = useI18n()
  const head = useLocaleHead({ addDirAttribute: true, addSeoAttributes: true })

  const polyfills =
    'https://polyfill.io/v3/polyfill.min.js?features=Promise&flags=gated'

  useHead(head.value)
  useHead({
    bodyAttrs: {
      class:
        'bg-background-bright dark:bg-background-dark text-text-dark dark:text-text-bright',
    },
    link: [
      {
        rel: 'preload',
        href: polyfills,
        crossorigin: 'anonymous',
        as: 'script',
        'data-testid': 'polyfill-preload',
      },
      {
        href: '/assets/static/favicon/apple-touch-icon.png?v=2EvuFKRRxT',
        rel: 'apple-touch-icon',
        sizes: '180x180',
      },
      {
        href: '/assets/static/favicon/favicon-16x16.png?v=2EvuFKRRxT',
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        href: '/assets/static/favicon/favicon-32x32.png?v=2EvuFKRRxT',
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        href: '/favicon.ico?v=2EvuFKRRxT',
        rel: 'icon',
        type: 'image/x-icon',
      },
      {
        color: '#202020',
        href: '/assets/static/favicon/safari-pinned-tab.svg?v=2EvuFKRRxT',
        rel: 'mask-icon',
      },
      {
        href: '/favicon.ico?v=2EvuFKRRxT',
        rel: 'shortcut icon',
      },
    ],
    meta: [
      {
        key: 'description',
        name: 'description',
        property: 'description',
        content: t('globalOgSeoDescription'),
      },
      {
        key: 'og:description',
        property: 'og:description',
        content: t('globalOgSeoDescription'),
      },
      {
        content: '/assets/static/favicon/browserconfig.xml?v=2EvuFKRRxT',
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
        key: 'og:image',
        property: 'og:image',
        content: `https://${host}/assets/static/logos/open-graph.png`, // Does not support .svg as of 2021-06.
      },
      {
        key: 'og:image:alt',
        property: 'og:image:alt',
        content: t('globalOgImageAlt'),
      },
      {
        key: 'og:image:height',
        property: 'og:image:height',
        content: '627',
      },
      {
        key: 'og:image:width',
        property: 'og:image:width',
        content: '1200',
      },
      {
        key: 'og:site_name',
        property: 'og:site_name',
        content: 'maevsi',
      },
      {
        key: 'og:type',
        property: 'og:type',
        content: 'website', // https://ogp.me/#types
      },
      {
        key: 'og:title',
        property: 'og:title',
        content: 'maevsi',
      },
      {
        key: 'og:url',
        property: 'og:url',
        content: 'https://' + host + router.currentRoute.value.fullPath,
      },
      {
        key: 'twitter:card',
        property: 'twitter:card',
        content: 'summary',
      },
      {
        key: 'twitter:description',
        property: 'twitter:description',
        content: t('globalOgSeoDescription'),
      },
      {
        key: 'twitter:image',
        property: 'twitter:image',
        content: `https://${host}/assets/static/logos/open-graph.png`, // Does not support .svg as of 2021-06.
      },
      {
        key: 'twitter:image:alt',
        property: 'twitter:image:alt',
        content: t('globalOgImageAlt'),
      },
      // TODO: Get access to the @maevsi handle.
      // {
      //   key: 'twitter:site',
      //   property: 'twitter:site',
      //   content: '@maevsi',
      // },
      {
        key: 'twitter:title',
        property: 'twitter:title',
        content: 'maevsi',
      },
    ],
    script: [
      {
        src: polyfills,
        crossorigin: 'anonymous',
        'data-testid': 'polyfill-script',
      },
    ],
    titleTemplate: (titleChunk?: string) => {
      return titleChunk && titleChunk !== 'maevsi'
        ? `${titleChunk} · maevsi`
        : 'maevsi'
    },
  })
}
