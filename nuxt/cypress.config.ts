import { defineConfig } from 'cypress'
import getCompareSnapshotsPlugin from 'cypress-visual-regression/dist/plugin'

export default defineConfig({
  e2e: {
    baseUrl: `http${
      process.env.NODE_ENV === 'production' ? '' : 's'
    }://127.0.0.1:3000`,
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config)
    },
    video: false,
  },
  env: {
    failSilently: false,
  },
  screenshotsFolder: './cypress/snapshots/actual',
  trashAssetsBeforeRuns: true,
})
