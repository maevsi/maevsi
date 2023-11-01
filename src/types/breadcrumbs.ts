import type { BreadcrumbItemProps } from 'nuxt-seo-ui'

export type BreadcrumbItemPropsLocalizedObject = Omit<
  BreadcrumbItemProps,
  'ariaLabel' | 'label' | 'to'
> & {
  ariaLabel?: { [Key in LOCALE_CODES]: string } | string
  label?: { [Key in LOCALE_CODES]: string } | string
  to: string
}

export type UseBreadcrumbItemPropsLocalized = () =>
  | BreadcrumbItemPropsLocalizedObject
  | Promise<BreadcrumbItemPropsLocalizedObject>
