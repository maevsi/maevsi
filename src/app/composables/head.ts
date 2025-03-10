export const useAppLayout = () => {
  const appConfig = useAppConfig()
  const siteConfig = useSiteConfig()

  if (import.meta.server) {
    useHeadSafe({
      bodyAttrs: {
        class:
          'bg-(--semantic-base-background) text-(--semantic-base-text-primary)',
      },
      link: [
        {
          color: appConfig.vio.themeColor,
          href: `/assets/static/favicon/safari-pinned-tab.svg?v=${CACHE_VERSION}`,
          rel: 'mask-icon',
        },
        {
          href: `/favicon.ico?v=${CACHE_VERSION}`,
          rel: 'shortcut icon',
        },
      ],
    })
    useSeoMeta({
      msapplicationConfig: `/assets/static/favicon/browserconfig.xml?v=${CACHE_VERSION}`,
      ...(appConfig.vio.themeColor
        ? {
            msapplicationTileColor: appConfig.vio.themeColor,
            themeColor: appConfig.vio.themeColor,
          }
        : {}),
      ...(appConfig.vio.seoMeta || {}),
    })
  }

  // TODO: replace with import.meta.server wrapper
  useServerHeadSafe({
    ...useLocaleHead().value,
  })

  // running server-side only leads to incorrect title template on hydration
  useSeoMeta({
    titleTemplate: (title) =>
      TITLE_TEMPLATE({
        siteName: siteConfig.name,
        title,
      }),
  })
}

export const useHeadDefault = (input: Parameters<typeof useSeoMeta>[0]) => {
  const siteConfig = useSiteConfig()

  const description = input.description || siteConfig.description
  const title = TITLE_TEMPLATE({
    siteName: siteConfig.name,
    title: input.title?.toString(),
  })

  useSeoMeta({
    ...(description
      ? {
          description,
          ogDescription: description,
          twitterDescription: description,
        }
      : {}),
    ...(title ? { title, ogTitle: title, twitterTitle: title } : {}),
    ...input,
  })
}

const POLYFILLS_URL = `https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=${POLYFILLS.join(
  '%2C',
)}&flags=gated`

export const usePolyfills = () => {
  if (!POLYFILLS.length) return

  if (import.meta.server) {
    useHead({
      link: [
        {
          rel: 'preload',
          href: POLYFILLS_URL,
          crossorigin: 'anonymous',
          as: 'script',
          'data-testid': 'polyfill-preload',
        },
      ],
      script: [
        {
          src: POLYFILLS_URL,
          crossorigin: 'anonymous',
          'data-testid': 'polyfill-script',
        },
      ],
    })
  }
}
