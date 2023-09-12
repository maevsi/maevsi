import { defu } from 'defu'
import type { ComputedRef } from 'vue'

export const useHeadDefault = ({
  extension,
  title,
}: {
  extension?: Parameters<typeof useServerSeoMeta>[0]
  title: string | ComputedRef<string>
}) => {
  const attrs = useAttrs()
  const siteConfig = useSiteConfig()

  const defaults: Parameters<typeof useServerSeoMeta>[0] = {
    msapplicationConfig: `/assets/static/favicon/browserconfig.xml?v=${CACHE_VERSION}`,
    title,
    twitterDescription: attrs['site-description'] as string,
    twitterTitle: ref(
      TITLE_TEMPLATE({
        siteName: siteConfig.name,
        title: toValue(title),
      }),
    ), // TODO: remove `ref`
  }

  useSeoMeta(defu(extension, defaults)) // TODO: use `useServerSeoMeta`
}
