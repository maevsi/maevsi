import type { WritableComputedRef } from 'vue'
import type { BreadcrumbItemPropsLocalized } from '~/types/breadcrumbs'

export const useGetBreadcrumbItemProps = () => {
  const localePath = useLocalePath()

  return (
    breadcrumbWithLocales: BreadcrumbItemPropsLocalized[],
    locale: WritableComputedRef<string>,
  ) =>
    breadcrumbWithLocales.map((x) =>
      getBreadcrumbItemProps(x, locale, localePath),
    )
}

const getBreadcrumbItemProps = (
  breadcrumbWithLocales: BreadcrumbItemPropsLocalized,
  locale: WritableComputedRef<string>,
  localePath: (x: string) => string,
) => {
  const breadcrumbWithLocalesResolved =
    typeof breadcrumbWithLocales === 'function'
      ? breadcrumbWithLocales()
      : breadcrumbWithLocales

  return {
    ...breadcrumbWithLocalesResolved,
    ariaLabel: breadcrumbWithLocalesResolved.ariaLabel
      ? typeof breadcrumbWithLocalesResolved.ariaLabel === 'string'
        ? breadcrumbWithLocalesResolved.ariaLabel
        : breadcrumbWithLocalesResolved.ariaLabel[locale.value as LOCALE_CODES]
      : undefined,
    label: breadcrumbWithLocalesResolved.label
      ? typeof breadcrumbWithLocalesResolved.label === 'string'
        ? breadcrumbWithLocalesResolved.label
        : breadcrumbWithLocalesResolved.label[locale.value as LOCALE_CODES]
      : undefined,
    to: localePath(breadcrumbWithLocalesResolved.to),
  }
}
