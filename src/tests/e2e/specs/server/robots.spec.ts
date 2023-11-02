import { test, expect } from '@playwright/test'
import { testPageLoad } from '../../utils/tests'

const PAGE_PATH = '/robots.txt'

testPageLoad(PAGE_PATH)

test.describe('robots.txt', () => {
  test('content', async ({ request }) => {
    const resp = await request.get(PAGE_PATH)
    expect(await resp.text()).toMatchSnapshot(
      `robots-txt-content-${
        process.env.NODE_ENV === 'production' ? 'production' : 'development'
      }.txt`,
    )
  })
})
