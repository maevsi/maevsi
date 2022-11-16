import { defineConfig } from 'cypress'
import getCompareSnapshotsPlugin from 'cypress-visual-regression/dist/plugin'

import { CYPRESS_BASE_URL } from './utils/constants'

export default defineConfig({
  downloadsFolder: 'test/cypress/downloads',
  e2e: {
    baseUrl: CYPRESS_BASE_URL,
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config)

      config.env = {
        ...process.env,
        ...config.env,
      }

      return config
    },
    supportFile: 'test/cypress/support/e2e.{js,jsx,ts,tsx}',
    specPattern: 'test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: false,
  },
  env: {
    failSilently: false,
  },
  fixturesFolder: 'test/cypress/fixtures',
  screenshotsFolder: 'test/cypress/snapshots/actual',
  supportFolder: 'test/cypress/support',
  trashAssetsBeforeRuns: true,
  videosFolder: 'test/cypress/videos',
})
