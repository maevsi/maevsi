import { testPageLoad, testVisualRegression } from '../../../utils/tests'

import { helpers } from '../../../../../.nuxt/typed-router/__helpers'

const PAGE_PATH = helpers.path('/invitation/unlock').toString()

testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)
