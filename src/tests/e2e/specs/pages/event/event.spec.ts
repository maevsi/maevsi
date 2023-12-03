import { testPageLoad } from '../../../utils/tests'

import { helpers } from '../../../../../.nuxt/typed-router/__helpers'

const PAGE_PATH = helpers.path('/event').toString()

testPageLoad(PAGE_PATH)

// TODO: mock data
// testVisualRegression(PAGE_PATH)
