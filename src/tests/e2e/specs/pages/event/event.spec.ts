import { testPageLoad } from '../../../utils/tests'

import { helpers } from '@typed-router'

const PAGE_PATH = helpers.route({ path: '/event' })

testPageLoad(PAGE_PATH)

// TODO: mock data
// testVisualRegression(PAGE_PATH)
