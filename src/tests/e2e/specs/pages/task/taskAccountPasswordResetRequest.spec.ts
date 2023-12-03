import { testPageLoad, testVisualRegression } from '../../../utils/tests'

import { helpers } from '@typed-router'

const PAGE_PATH = helpers.route({ path: '/account/password/reset/request' })

testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)
