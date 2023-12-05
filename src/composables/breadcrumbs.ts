import type { TypedToLocalePath } from '@typed-router'

import type { BreadcrumbItemPropsLocalizedObject } from '~/types/breadcrumbs'

export const useGetBreadcrumbItemProps = () => {
  const { locale } = useI18n()
  const localePath = useLocalePath()

  return (
    breadcrumbsWithLocales: BreadcrumbItemPropsLocalizedObject<any, any>[],
  ) =>
    breadcrumbsWithLocales.map((breadcrumbWithLocales) =>
      getBreadcrumbItemProps(
        breadcrumbWithLocales,
        locale.value as LOCALE_CODES,
        localePath,
      ),
    )
}

const getBreadcrumbItemProps = (
  breadcrumbWithLocales: BreadcrumbItemPropsLocalizedObject<any, any>,
  locale: LOCALE_CODES,
  localePath: TypedToLocalePath,
) => ({
  ...breadcrumbWithLocales,
  ariaLabel: breadcrumbWithLocales.ariaLabel
    ? typeof breadcrumbWithLocales.ariaLabel === 'string'
      ? breadcrumbWithLocales.ariaLabel
      : breadcrumbWithLocales.ariaLabel[locale]
    : undefined,
  label: breadcrumbWithLocales.label
    ? typeof breadcrumbWithLocales.label === 'string'
      ? breadcrumbWithLocales.label
      : breadcrumbWithLocales.label[locale]
    : undefined,
  to: localePath(breadcrumbWithLocales.to, locale).toString(),
})
