import { testVisualRegression } from '../../../utils/tests'

import { helpers } from '@typed-router'

const PAGE_PATH = helpers.route({ path: '/contact' })

testVisualRegression(PAGE_PATH)
