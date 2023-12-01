import type { BreadcrumbItemProps } from 'nuxt-seo-ui'
import type { NuxtRoute } from '@typed-router/__router'
import type { RoutesNamesList } from '@typed-router/__routes'

export type BreadcrumbItemPropsLocalizedObject<
  T extends RoutesNamesList,
  P extends string,
> = Omit<BreadcrumbItemProps, 'ariaLabel' | 'label' | 'to'> & {
  ariaLabel?: { [Key in LOCALE_CODES]: string } | string
  label?: { [Key in LOCALE_CODES]: string } | string
  to: NuxtRoute<T, P>
}

export type UseBreadcrumbItemPropsLocalized<
  T extends RoutesNamesList,
  P extends string,
> = () =>
  | BreadcrumbItemPropsLocalizedObject<T, P>
  | Promise<BreadcrumbItemPropsLocalizedObject<T, P>>
