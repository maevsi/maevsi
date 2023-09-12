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
