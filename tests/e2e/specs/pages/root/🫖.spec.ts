import { testPageLoad, testVisualRegression } from '#tests/e2e/utils/tests'

const PAGE_PATH = '/%F0%9F%AB%96'

testPageLoad(PAGE_PATH, 418)
testVisualRegression(PAGE_PATH)

// test.describe('visual regression', () => {
// // TODO: enable (https://github.com/harlan-zw/nuxt-og-image/issues/81)
// test('generates the open graph image', async ({ page }) => {
//   await page.goto('/__og-image__/image/teapot/og.png')
//   await expect(page).toHaveScreenshot({ fullPage: true })

//   await page.goto('/__og-image__/image/de/teapot/og.png')
//   await expect(page).toHaveScreenshot({ fullPage: true })
// })
// })
