// @ts-check
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginYml from 'eslint-plugin-yml'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  ...eslintPluginYml.configs['flat/recommended'],
  {
    rules: {
      'no-console': 'error',
      'yml/quotes': ['error', { prefer: 'double' }],
    },
  },
)
