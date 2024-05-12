import { VIO_ESLINT_CONFIG } from '@dargmuesli/nuxt-vio/.config/lint.js'
import jiti from 'jiti'

import withNuxt from './.nuxt/eslint.config.mjs'

const moduleFileUrl = new URL(import.meta.url)
const JITI = jiti(moduleFileUrl.pathname)
const POLYFILLS = JITI('./utils/constants.ts').POLYFILLS

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
