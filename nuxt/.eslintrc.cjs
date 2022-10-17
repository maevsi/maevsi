module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:@intlify/vue-i18n/recommended',
    'plugin:compat/recommended',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:yml/standard',
  ],
  overrides: [
    {
      files: ['*.stories.ts'],
      rules: {
        '@intlify/vue-i18n/no-raw-text': 'off',
      },
    },
  ],
  root: true,
  rules: {
    '@intlify/vue-i18n/no-missing-keys': 'error',
    '@intlify/vue-i18n/no-raw-text': 'error',
    'yml/quotes': ['error', { prefer: 'single' }],
  },
  settings: {
    polyfills: ['Promise'],
    'vue-i18n': {
      localeDir: './locales/*.json',
    },
  },
}
