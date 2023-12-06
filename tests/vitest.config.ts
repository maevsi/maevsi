import { resolve } from 'node:path'

import { defineConfig } from 'vitest/config'

const r = (p: string) => resolve(__dirname, p)

export default defineConfig({
  test: {
    include: ['./unit/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '~': r('../src'),
      '#src': r('../src'),
    },
  },
})
