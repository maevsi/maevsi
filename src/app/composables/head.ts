import { defu } from 'defu'

export const useAppLayout = () => {
  const appConfig = useAppConfig()
  const siteConfig = useSiteConfig()

  useServerHeadSafe({
    ...useLocaleHead().value,
    bodyAttrs: {
      class:
        'bg-background-bright dark:bg-background-dark text-text-dark dark:text-text-bright',
    },
  })

  // adding `Server` leads incorrect title template on hydration
  useSeoMeta({
    titleTemplate: (title) =>
      TITLE_TEMPLATE({
        siteName: siteConfig.name,
        title,
      }),
  })

  if (appConfig.vio.seoMeta) {
    useServerSeoMeta(appConfig.vio.seoMeta)
  }

  if (appConfig.vio.themeColor) {
    useServerSeoMeta({
      msapplicationTileColor: appConfig.vio.themeColor,
      themeColor: appConfig.vio.themeColor,
    })
  }
}

export const useFavicons = () => {
  const appConfig = useAppConfig()

  useServerHeadSafe({
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
}

export const useHeadDefault = ({
  extension,
  title,
}: {
  extension?: Parameters<typeof useServerSeoMeta>[0]
  title: string | ComputedRef<string>
}) => {
  const siteConfig = useSiteConfig()
  const { t } = useI18n()

  const defaults: Parameters<typeof useServerSeoMeta>[0] = {
    description: t('globalSeoSiteDescription'), // TODO: remove (https://github.com/harlan-zw/nuxt-site-config/issues/11)
    msapplicationConfig: `/assets/static/favicon/browserconfig.xml?v=${CACHE_VERSION}`,
    title,
    twitterDescription: t('globalSeoSiteDescription'),
    twitterTitle: ref(
      TITLE_TEMPLATE({
        siteName: siteConfig.name,
        title: toValue(title),
      }),
    ), // TODO: remove `ref`
  }

  useSeoMeta(defu(extension, defaults)) // TODO: use `useServerSeoMeta`
}

export const usePolyfills = () => {
  if (!POLYFILLS.length) return

  const polyfillsUrl = `https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=${POLYFILLS.join(
    '%2C',
  )}&flags=gated`

  useServerHead({
    link: [
      {
        rel: 'preload',
        href: polyfillsUrl,
        crossorigin: 'anonymous',
        as: 'script',
        'data-testid': 'polyfill-preload',
      },
    ],
    script: [
      {
        src: polyfillsUrl,
        crossorigin: 'anonymous',
        'data-testid': 'polyfill-script',
      },
    ],
  })
}
