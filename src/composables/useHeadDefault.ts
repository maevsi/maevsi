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

  const defaults: Parameters<typeof useServerSeoMeta>[0] = {
    msapplicationConfig: `/assets/static/favicon/browserconfig.xml?v=${CACHE_VERSION}`,
    title,
    twitterDescription: attrs['site-description'] as string,
    twitterTitle: title,
  }

  useServerSeoMeta(defu(extension, defaults))
}
