import {
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '../../../utils/tests'

import { helpers } from '../../../../../.nuxt/typed-router/__helpers'

const PAGE_PATH = helpers.path('/legal-notice').toString()

testPageLoad(PAGE_PATH)
testOgImage(PAGE_PATH)
testVisualRegression(PAGE_PATH)
