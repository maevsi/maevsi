import { test, expect } from '@playwright/test'

test.describe('headers middleware', () => {
  test('sets the correct CSP header', async ({ request }) => {
    const resp = await request.get('/')

    expect(resp.headers()['content-security-policy']).toMatchSnapshot('csp.txt')
  })
})
