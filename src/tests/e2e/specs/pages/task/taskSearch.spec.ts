import { testPageLoad, testVisualRegression } from '../../../utils/tests'

const PAGE_PATH = '/tasks/search'

testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)
