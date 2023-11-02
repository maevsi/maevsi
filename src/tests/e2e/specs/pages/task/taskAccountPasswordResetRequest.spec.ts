import { testPageLoad, testVisualRegression } from '../../../utils/tests'

const PAGE_PATH = '/tasks/accounts/password/reset/request'

testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)
