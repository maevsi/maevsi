import type { BreadcrumbLink } from '#ui/types'
import type { TypedLocalePathParameter } from '@typed-router/__paths'

export type BreadcrumbLinkLocalized = Omit<BreadcrumbLink, 'label'> & {
  ariaLabel?: { [Key in LOCALE_CODES]: string } | string
  label: { [Key in LOCALE_CODES]: string } | string
  to: TypedLocalePathParameter<never>
}

export type UseBreadcrumbItemPropsLocalized = () =>
  | BreadcrumbLinkLocalized
  | Promise<BreadcrumbLinkLocalized>
