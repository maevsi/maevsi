import { testVisualRegression } from '../../../utils/tests'

import { helpers } from '../../../../../.nuxt/typed-router/__helpers'

const PAGE_PATH = helpers.path('/dashboard').toString()

testVisualRegression(PAGE_PATH)
