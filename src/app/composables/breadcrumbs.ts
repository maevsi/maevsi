import type { BreadcrumbLinkLocalized } from '~/types/breadcrumbs'

export const useGetBreadcrumbItemProps = () => {
  const { locale } = useI18n()
  const localePath = useLocalePath()

  return (breadcrumbsWithLocales: BreadcrumbLinkLocalized[]) =>
    breadcrumbsWithLocales.map((breadcrumbWithLocales) =>
      getBreadcrumbItemProps(
        breadcrumbWithLocales,
        locale.value as LOCALE_CODES,
        localePath,
      ),
    )
}

const getBreadcrumbItemProps = (
  breadcrumbWithLocales: BreadcrumbLinkLocalized,
  locale: LOCALE_CODES,
  localePath: ReturnType<typeof useLocalePath>,
) => ({
  ...breadcrumbWithLocales,
  'aria-label': breadcrumbWithLocales.ariaLabel
    ? typeof breadcrumbWithLocales.ariaLabel === 'string'
      ? breadcrumbWithLocales.ariaLabel
      : breadcrumbWithLocales.ariaLabel[locale]
    : undefined,
  label: breadcrumbWithLocales.label
    ? typeof breadcrumbWithLocales.label === 'string'
      ? breadcrumbWithLocales.label
      : breadcrumbWithLocales.label[locale]
    : '',
  to: localePath(breadcrumbWithLocales.to, locale).toString(),
})
