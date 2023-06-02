import { resolve } from 'path'

import { defineConfig } from 'vite'

const r = (p: string) => resolve(__dirname, p)

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '~': r('.'),
    },
  },
})
