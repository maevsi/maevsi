import { test, expect } from '@playwright/test'

test.describe('headers middleware', () => {
  test('sets the correct security headers', async ({ request }) => {
    if (process.env.VIO_SERVER === 'static') return // TODO: use single snapshot and all servers

    const headers = (await request.get('/')).headers()

    expect(
      headers['content-security-policy'].replace(/nonce-[^']+/g, 'nonce'),
    ).toMatchSnapshot(
      `csp-${
        process.env.NODE_ENV === 'production' ? 'production' : 'development'
      }.txt`,
    )
  })
})
