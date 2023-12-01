import type { WritableComputedRef } from 'vue'
import type { TypedToLocalePath } from '@typed-router/__i18n-router'
import type { BreadcrumbItemPropsLocalizedObject } from '~/types/breadcrumbs'

export const useGetBreadcrumbItemProps = () => {
  const localePath = useLocalePath()

  return (
    breadcrumbsWithLocales: BreadcrumbItemPropsLocalizedObject<any, any>[],
    locale: WritableComputedRef<string>,
  ) =>
    breadcrumbsWithLocales.map((breadcrumbWithLocales) =>
      getBreadcrumbItemProps(breadcrumbWithLocales, locale, localePath),
    )
}

const getBreadcrumbItemProps = (
  breadcrumbWithLocales: BreadcrumbItemPropsLocalizedObject<any, any>,
  locale: WritableComputedRef<string>,
  localePath: TypedToLocalePath,
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
  to: localePath(breadcrumbWithLocales.to).toString(),
})
