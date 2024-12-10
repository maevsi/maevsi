import type { BreadcrumbItemProps } from 'nuxt-seo-ui'

export type BreadcrumbLinkLocalized = Omit<
  BreadcrumbItemProps,
  'ariaLabel' | 'label' | 'to'
> & {
  ariaLabel?: { [Key in LOCALE_CODES]: string } | string
  label?: { [Key in LOCALE_CODES]: string } | string
  to: TypedLocalePathParameter<never>
}

export type UseBreadcrumbItemPropsLocalized = () =>
  | BreadcrumbLinkLocalized
  | Promise<BreadcrumbLinkLocalized>
