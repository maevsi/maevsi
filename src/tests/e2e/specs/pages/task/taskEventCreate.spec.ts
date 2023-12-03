import { testVisualRegression } from '../../../utils/tests'

import { helpers } from '@typed-router'

const PAGE_PATH = helpers.route({ path: '/event/create' })

testVisualRegression(PAGE_PATH)
