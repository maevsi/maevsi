import { defineConfig } from 'cypress'
import getCompareSnapshotsPlugin from 'cypress-visual-regression/dist/plugin'

import { CYPRESS_BASE_URL } from './plugins/util/constants'

export default defineConfig({
  e2e: {
    baseUrl: CYPRESS_BASE_URL(process.env.NODE_ENV || 'development'),
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config)

      config.env = {
        ...process.env,
        ...config.env,
      }

      return config
    },
    video: false,
  },
  env: {
    failSilently: false,
  },
  screenshotsFolder: './cypress/snapshots/actual',
  trashAssetsBeforeRuns: true,
})
