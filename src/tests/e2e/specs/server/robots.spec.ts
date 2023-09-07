import { test, expect } from '@playwright/test'

test.describe('page load', () => {
  test('loads the page successfully', async ({ request }) => {
    const resp = await request.get('/robots.txt')
    expect(resp.status()).toBe(200)
  })
})

test.describe('robots.txt', () => {
  test('content', async ({ request }) => {
    const resp = await request.get('/robots.txt')
    expect(await resp.text()).toMatchSnapshot(
      `robots-txt-content-${
        process.env.NODE_ENV === 'production' ? 'production' : 'development'
      }.txt`,
    )
  })
})
