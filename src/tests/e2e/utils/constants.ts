import { expect } from '@playwright/test'
import type { Page } from 'playwright-core'

export const COOKIE_CONTROL_DEFAULT = 'acltga'
export const TIMEZONE_DEFAULT = 'Europe/Berlin'
export const PAGE_READY = async ({
  page,
  options,
}: {
  page: Page
  options?: {
    cookieControl?: boolean
    devTools?: boolean
    isLoading?: boolean
  }
}) => {
  if (!options || options.cookieControl !== false) {
    await page.getByRole('button', { name: 'Cookie control' }).isVisible()
  }

  if (!options || options.devTools !== false) {
    await page.getByRole('button', { name: 'Toggle Nuxt DevTools' }).isVisible()
  }

  if (!options || options.isLoading !== false) {
    await expect(page.getByTestId('is-loading')).toHaveAttribute(
      'data-is-loading',
      'false',
    )
  }
}
