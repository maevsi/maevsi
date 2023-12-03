import { testVisualRegression } from '../../../utils/tests'

import { helpers } from '@typed-router'

const PAGE_PATH = helpers.route({ path: '/dashboard' })

testVisualRegression(PAGE_PATH)
