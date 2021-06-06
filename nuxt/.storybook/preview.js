export * from '~~/.nuxt-storybook/storybook/preview.js'

import { addDecorator } from '@storybook/vue'
import { initializeWorker, mswDecorator } from 'msw-storybook-addon'

initializeWorker()
addDecorator(mswDecorator)
