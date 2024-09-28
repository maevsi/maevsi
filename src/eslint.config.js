import { VIO_ESLINT_CONFIG } from '@dargmuesli/nuxt-vio/.config/lint.js'
import { createJiti } from 'jiti'

import withNuxt from './.nuxt/eslint.config.mjs'

const jiti = createJiti(import.meta.url)
const POLYFILLS = (await jiti.import('./utils/constants.ts')).POLYFILLS

export default withNuxt(
  ...VIO_ESLINT_CONFIG,
  {
    settings: {
      polyfills: POLYFILLS,
      'vue-i18n': {
        localeDir: [
          {
            pattern: './locales/*.json',
          },
          {
            pattern: './node_modules/@dargmuesli/nuxt-vio/locales/*.json',
          },
        ],
      },
    },
  },
  {
    ignores: ['gql/generated/**/*'],
  },
  {
    files: ['locales/**/*'],
    rules: {
      '@intlify/vue-i18n/no-duplicate-keys-in-locale': 'off',
    },
  }, // TODO: remove once `@intlify/vue-i18n/no-duplicate-keys-in-locale` is checked across layers
)
