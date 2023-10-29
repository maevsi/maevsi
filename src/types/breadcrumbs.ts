import type { BreadcrumbItemProps } from 'nuxt-seo-ui'

type BreadcrumbItemPropsLocalizedObject = Omit<
  BreadcrumbItemProps,
  'ariaLabel' | 'label' | 'to'
> & {
  ariaLabel?: { [Key in LOCALE_CODES]: string } | string
  label?: { [Key in LOCALE_CODES]: string } | string
  to: string
}

export type BreadcrumbItemPropsLocalized =
  | BreadcrumbItemPropsLocalizedObject
  | (() => BreadcrumbItemPropsLocalizedObject)
