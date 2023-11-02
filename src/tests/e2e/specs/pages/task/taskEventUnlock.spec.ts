import { testPageLoad, testVisualRegression } from '../../../utils/tests'

const PAGE_PATH = '/tasks/events/unlock'

testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)
