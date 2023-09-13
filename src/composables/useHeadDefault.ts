import { defu } from 'defu'
import type { ComputedRef } from 'vue'

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
    description: t('globalSeoSiteDescription'), // TODO: remove (https://github.com/harlan-zw/nuxt-site-config/pull/7)
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
