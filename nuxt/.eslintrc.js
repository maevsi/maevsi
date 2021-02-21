module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:compat/recommended',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  // add your custom rules here
  root: true,
  rules: {},
  settings: {
    polyfills: ['Promise'],
  },
}
