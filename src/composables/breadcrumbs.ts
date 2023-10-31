import type { WritableComputedRef } from 'vue'
import type { LocalePathFunction } from 'vue-i18n-routing'
import type { BreadcrumbItemPropsLocalizedObject } from '~/types/breadcrumbs'

export const useGetBreadcrumbItemProps = () => {
  const localePath = useLocalePath()

  return (
    breadcrumbWithLocales: BreadcrumbItemPropsLocalizedObject[],
    locale: WritableComputedRef<string>,
  ) =>
    breadcrumbWithLocales.map((x) =>
      getBreadcrumbItemProps(x, locale, localePath),
    )
}

const getBreadcrumbItemProps = (
  breadcrumbWithLocales: BreadcrumbItemPropsLocalizedObject,
  locale: WritableComputedRef<string>,
  localePath: LocalePathFunction,
) => ({
  ...breadcrumbWithLocales,
  ariaLabel: breadcrumbWithLocales.ariaLabel
    ? typeof breadcrumbWithLocales.ariaLabel === 'string'
      ? breadcrumbWithLocales.ariaLabel
      : breadcrumbWithLocales.ariaLabel[locale.value as LOCALE_CODES]
    : undefined,
  label: breadcrumbWithLocales.label
    ? typeof breadcrumbWithLocales.label === 'string'
      ? breadcrumbWithLocales.label
      : breadcrumbWithLocales.label[locale.value as LOCALE_CODES]
    : undefined,
  to: localePath(breadcrumbWithLocales.to),
})
