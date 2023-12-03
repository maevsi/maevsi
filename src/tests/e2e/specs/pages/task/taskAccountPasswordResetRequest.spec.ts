import { testPageLoad, testVisualRegression } from '../../../utils/tests'

import { helpers } from '../../../../../.nuxt/typed-router/__helpers'

const PAGE_PATH = helpers.path('/account/password/reset/request').toString()

testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)
