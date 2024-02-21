import type { TypedToLocalePath } from '@typed-router'

import type { BreadcrumbLinkLocalized } from '~/types/breadcrumbs'

export const useGetBreadcrumbItemProps = () => {
  const { locale } = useI18n()
  const localePath = useLocalePath()

  return (breadcrumbsWithLocales: BreadcrumbLinkLocalized[]) =>
    breadcrumbsWithLocales.map((breadcrumbLinkLocalized) =>
      getBreadcrumbItemProps(
        breadcrumbLinkLocalized,
        locale.value as LOCALE_CODES,
        localePath,
      ),
    )
}

const getBreadcrumbItemProps = (
  breadcrumbLinkLocalized: BreadcrumbLinkLocalized,
  locale: LOCALE_CODES,
  localePath: TypedToLocalePath,
) => ({
  'aria-label': breadcrumbLinkLocalized.ariaLabel
    ? typeof breadcrumbLinkLocalized.ariaLabel === 'string'
      ? breadcrumbLinkLocalized.ariaLabel
      : breadcrumbLinkLocalized.ariaLabel[locale]
    : undefined,
  label:
    typeof breadcrumbLinkLocalized.label === 'string'
      ? breadcrumbLinkLocalized.label
      : breadcrumbLinkLocalized.label[locale],
  to: localePath(breadcrumbLinkLocalized.to, locale).toString(),
})
