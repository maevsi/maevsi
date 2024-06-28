import { defu } from 'defu'

export const useAppLayout = () => {
  const appConfig = useAppConfig()
  const siteConfig = useSiteConfig()

  // TODO: replace with `useServerHeadSafe`
  useHeadSafe({
    ...useLocaleHead({ addDirAttribute: true, addSeoAttributes: true }).value,
    bodyAttrs: {
      class:
        'bg-background-bright dark:bg-background-dark text-text-dark dark:text-text-bright',
    },
  })

  // TODO: convert to `useServerHeadSafe` (https://github.com/harlan-zw/nuxt-seo-kit/issues/98)
  useSeoMeta({
    titleTemplate: (title) =>
      TITLE_TEMPLATE({
        siteName: siteConfig.name,
        title,
      }),
  })

  if (appConfig.vio.seoMeta) {
    // TODO: replace with `useServerSeoMeta`
    useSeoMeta(appConfig.vio.seoMeta)
  }

  if (appConfig.vio.themeColor) {
    // TODO: replace with `useServerSeoMeta`
    useSeoMeta({
      msapplicationTileColor: appConfig.vio.themeColor,
      themeColor: appConfig.vio.themeColor,
    })
  }
}

export const useFavicons = () => {
  const appConfig = useAppConfig()

  // TODO: replace with `useServerHeadSafe`
  useHeadSafe({
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
  return // hijacked ⚠️

  const polyfills = `https://polyfill.io/v3/polyfill.min.js?features=${POLYFILLS.join(
    '%2C',
  )}&flags=gated`

  // TODO: replace with `useServerHead`
  useHead({
    link: [
      {
        rel: 'preload',
        href: polyfills,
        crossorigin: 'anonymous',
        as: 'script',
        'data-testid': 'polyfill-preload',
      },
    ],
    script: [
      {
        src: polyfills,
        crossorigin: 'anonymous',
        'data-testid': 'polyfill-script',
      },
    ],
  })
}
