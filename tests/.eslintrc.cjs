// TODO: convert file to ESM when ESLint is upgraded to v9
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:yml/standard',
  ],
  ignorePatterns: ['src'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'no-console': 'error',
    'yml/quotes': ['error', { prefer: 'single' }],
  },
}
