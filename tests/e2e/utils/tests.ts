import { expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { joinURL, withoutTrailingSlash } from 'ufo'

import { appTest } from '#tests/e2e/fixtures/appTest'
import { SITE_URL } from '#tests/e2e/utils/constants'

export const testA11y = (url: string) =>
  appTest.describe('a11y', () => {
    appTest(
      'should not have any automatically detectable accessibility issues',
      async ({ defaultPage }) => {
        await defaultPage.goto(url)

        const accessibilityScanResults = await new AxeBuilder({
          page: defaultPage.page,
        }).analyze()

        expect(
          accessibilityScanResults.violations
            .map(
              (x) =>
                `${x.id}\n${x.nodes.map(
                  (y) => `${y.failureSummary}\n(${y.html}\n(${y.target})`,
                )}`,
            )
            .join('\n'),
        ).toEqual('')
      },
    )
  })

export const testMetadata = async ({
  page,
  path,
  title,
}: {
  page: Page
  path: string
  title: string
}) => {
  await page.goto(path)

  expect(await page.title()).toStrictEqual(title)

  const meta = [
    {
      tag: 'html',
      attributes: [
        { key: 'dir', value: 'ltr' },
        { key: 'lang', value: 'en' },
      ],
    },
    {
      tag: 'link',
      attributes: [
        {
          key: 'data-testid',
          value: 'polyfill-preload',
        },
        { key: 'rel', value: 'preload' },
        {
          key: 'href',
          value:
            'https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=Promise%2CrequestAnimationFrame&flags=gated',
        },
        {
          key: 'crossorigin',
          value: 'anonymous',
        },
        {
          key: 'as',
          value: 'script',
        },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'charset',
          value: 'utf-8',
        },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'name',
          value: 'viewport',
        },
        { key: 'content', value: 'width=device-width, initial-scale=1' },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'property',
          value: 'og:image',
        },
        {
          key: 'content',
          value: joinURL(
            SITE_URL,
            `/__og-image__/${process.env.VIO_SERVER === 'static' ? 'static' : 'image'}`,
            path,
            '/og.png',
          ),
        },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'property',
          value: 'og:image:type',
        },
        {
          key: 'content',
          value: 'image/png',
        },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'name',
          value: 'twitter:card',
        },
        { key: 'content', value: 'summary_large_image' },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'name',
          value: 'twitter:image',
        },
        {
          key: 'content',
          value: joinURL(
            SITE_URL,
            `/__og-image__/${process.env.VIO_SERVER === 'static' ? 'static' : 'image'}`,
            path,
            '/og.png',
          ),
        },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'name',
          value: 'twitter:image:src',
        },
        {
          key: 'content',
          value: joinURL(
            SITE_URL,
            `/__og-image__/${process.env.VIO_SERVER === 'static' ? 'static' : 'image'}`,
            path,
            '/og.png',
          ),
        },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'property',
          value: 'og:image:width',
        },
        { key: 'content', value: '1200' },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'name',
          value: 'twitter:image:width',
        },
        { key: 'content', value: '1200' },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'property',
          value: 'og:image:height',
        },
        { key: 'content', value: '600' },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'name',
          value: 'twitter:image:height',
        },
        { key: 'content', value: '600' },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'property',
          value: 'og:image:alt',
        },
        { key: 'content', value: "Vibetype's logo." },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'name',
          value: 'twitter:image:alt',
        },
        { key: 'content', value: "Vibetype's logo." },
      ],
    },
    {
      tag: 'link',
      attributes: [
        {
          key: 'rel',
          value: 'icon',
        },
        {
          key: 'href',
          value: '/favicon.ico?v=qfu1GSvnRF',
        },
        {
          key: 'sizes',
          value: '32x32',
        },
      ],
    },
    {
      tag: 'link',
      attributes: [
        {
          key: 'rel',
          value: 'icon',
        },
        {
          key: 'href',
          value: '/assets/static/favicon/favicon.svg?v=qfu1GSvnRF',
        },
        {
          key: 'type',
          value: 'image/svg+xml',
        },
      ],
    },
    {
      tag: 'link',
      attributes: [
        {
          key: 'rel',
          value: 'apple-touch-icon',
        },
        {
          key: 'href',
          value: '/assets/static/favicon/apple-touch-icon.png?v=qfu1GSvnRF',
        },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'property',
          value: 'og:type',
        },
        { key: 'content', value: 'website' },
      ],
    },
    {
      tag: 'link',
      attributes: [
        {
          key: 'rel',
          value: 'canonical',
        },
        {
          key: 'href',
          value: `${SITE_URL}${path}`,
        },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'name',
          value: 'robots',
        },
        {
          key: 'content',
          value:
            process.env.NODE_ENV === 'production'
              ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
              : 'noindex, nofollow',
        },
      ],
    },
    {
      tag: 'link',
      attributes: [
        {
          key: 'href',
          value: withoutTrailingSlash(`${SITE_URL}${path}`),
        },
        {
          key: 'hreflang',
          value: 'en',
        },
        {
          key: 'rel',
          value: 'alternate',
        },
      ],
    },
    {
      tag: 'link',
      attributes: [
        {
          key: 'href',
          value: withoutTrailingSlash(`${SITE_URL}/de${path}`),
        },
        {
          key: 'hreflang',
          value: 'de',
        },
        {
          key: 'rel',
          value: 'alternate',
        },
      ],
    },
    {
      tag: 'link',
      attributes: [
        {
          key: 'href',
          value: withoutTrailingSlash(`${SITE_URL}${path}`),
        },
        {
          key: 'hreflang',
          value: 'x-default',
        },
        {
          key: 'rel',
          value: 'alternate',
        },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'property',
          value: 'og:url',
        },
        {
          key: 'content',
          value: `${SITE_URL}${path}`,
        },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'property',
          value: 'og:locale',
        },
        { key: 'content', value: 'en' },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'property',
          value: 'og:locale:alternate',
        },
        { key: 'content', value: 'de' },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'name',
          value: 'theme-color',
        },
        { key: 'content', value: '#191911' },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'name',
          value: 'description',
        },
        { key: 'content', value: 'Find events, guests and friends 💙❤️💚' },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'property',
          value: 'og:description',
        },
        { key: 'content', value: 'Find events, guests and friends 💙❤️💚' },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'name',
          value: 'twitter:description',
        },
        { key: 'content', value: 'Find events, guests and friends 💙❤️💚' },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'property',
          value: 'og:title',
        },
        { key: 'content', value: title },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'name',
          value: 'twitter:title',
        },
        { key: 'content', value: title },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'property',
          value: 'og:site_name',
        },
        { key: 'content', value: 'Vibetype' },
      ],
    },
    {
      tag: 'meta',
      attributes: [
        {
          key: 'name',
          value: 'twitter:site',
        },
        { key: 'content', value: '@maev_si' },
      ],
    },
    {
      tag: 'script',
      attributes: [
        {
          key: 'data-hid',
          value: '3437552',
        },
        { key: 'type', value: 'application/ld+json' },
      ],
    },
  ]

  for (const object of meta) {
    await expect(
      page.locator(
        object.tag +
          object.attributes
            ?.map((attribute) => `[${attribute.key}="${attribute.value}"]`)
            .join(''),
      ),
    ).toBeAttached()
  }

  expect(
    await page.locator('script[data-hid="3437552"]').innerText(),
  ).toMatchSnapshot(`schema-org-graph-${process.env.VIO_SERVER || 'dev'}.json`)

  // if (process.env.VIO_SERVER === 'static') {
  //   expect(
  //     await page
  //       .locator('meta[http-equiv="Content-Security-Policy"]')
  //       .innerText(),
  //   ).toMatchSnapshot(`content-security-policy.txt`)
  // }
}

export const testOgImage = (url: string) =>
  appTest.describe('visual regression', () => {
    appTest('generates the open graph image', async ({ page }) => {
      await page.goto(joinURL('/__og-image__/image', url, '/og.png'))
      await expect(page).toHaveScreenshot({ fullPage: true })

      await page.goto(joinURL('/__og-image__/image/de', url, '/og.png'))
      await expect(page).toHaveScreenshot({ fullPage: true })
    })
  })

export const testPageLoad = (url: string, statusCode: number = 200) =>
  appTest.describe('page load', () => {
    appTest('loads the page successfully', async ({ request }) => {
      const resp = await request.get(url)
      expect(resp.status()).toBe(statusCode)
    })
  })

export const testVisualRegression = (url: string) =>
  appTest.describe('visual regression', () => {
    appTest('looks as before', async ({ defaultPage }) => {
      await defaultPage.goto(url)

      await expect(defaultPage.page).toHaveScreenshot({
        fullPage: true,
        timeout: 10000,
      })
    })
  })
