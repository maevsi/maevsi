import { defu } from 'defu'
import { MetaObject } from 'nuxt/dist/app'
import { ComputedRef } from 'vue'

export const useHeadDefault = (
  title: string | ComputedRef<string>,
  extension?: MetaObject
) => {
  const host = useHost()
  const router = useRouter()

  const defaults = {
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: title,
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: `https://${host}${router.currentRoute.value.fullPath}`,
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: title,
      },
    ],
    title,
  }

  return useHead(defu(extension, defaults))
}
